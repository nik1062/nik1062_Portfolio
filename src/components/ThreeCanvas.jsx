import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas({ density = "medium", height = "100%", interactive = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const canvasHeight = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(60, width / canvasHeight, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Get current accent color from CSS
    function getAccentColor() {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--accent").trim();
      return accent || "#86d65a";
    }

    let accentHex = new THREE.Color(getAccentColor());

    // 1. Central 3D Wireframe Polyhedron
    const geo = new THREE.IcosahedronGeometry(7, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: accentHex,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const polyhedron = new THREE.Mesh(geo, wireMat);
    scene.add(polyhedron);

    // 2. Inner Core Sphere
    const innerGeo = new THREE.SphereGeometry(3.5, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: accentHex,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerCore);

    // 3. Orbiting Network Nodes / Particles
    const particleCount = density === "high" ? 140 : density === "medium" ? 85 : 50;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 44;
      positions[i + 1] = (Math.random() - 0.5) * 36;
      positions[i + 2] = (Math.random() - 0.5) * 32;

      velocities.push({
        x: (Math.random() - 0.5) * 0.025,
        y: (Math.random() - 0.5) * 0.025,
        z: (Math.random() - 0.5) * 0.025
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle sprite using canvas
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);

    const pTexture = new THREE.CanvasTexture(canvas);
    const pMat = new THREE.PointsMaterial({
      color: accentHex,
      size: 1.2,
      map: pTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, pMat);
    scene.add(particles);

    // Dynamic Connections between close nodes
    const linesMat = new THREE.LineBasicMaterial({
      color: accentHex,
      transparent: true,
      opacity: 0.14
    });
    const maxConnections = particleCount * 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(lines);

    // Interactive mouse tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2;
      targetY = -y * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Theme Change Observer
    const observer = new MutationObserver(() => {
      const newColor = new THREE.Color(getAccentColor());
      wireMat.color = newColor;
      innerMat.color = newColor;
      pMat.color = newColor;
      linesMat.color = newColor;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Damped camera rotation towards mouse
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      camera.position.x = currentX * 6;
      camera.position.y = currentY * 4;
      camera.lookAt(scene.position);

      if (!prefersReducedMotion) {
        polyhedron.rotation.y += 0.0035;
        polyhedron.rotation.x += 0.002;
        innerCore.rotation.y -= 0.005;

        // Animate particles
        const pos = particleGeo.attributes.position.array;
        let lineIdx = 0;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          pos[i3] += velocities[i].x;
          pos[i3 + 1] += velocities[i].y;
          pos[i3 + 2] += velocities[i].z;

          // Boundary bounce
          if (pos[i3] < -22 || pos[i3] > 22) velocities[i].x *= -1;
          if (pos[i3 + 1] < -18 || pos[i3 + 1] > 18) velocities[i].y *= -1;
          if (pos[i3 + 2] < -16 || pos[i3 + 2] > 16) velocities[i].z *= -1;

          // Connect nearby particles with lines
          for (let j = i + 1; j < particleCount; j++) {
            const j3 = j * 3;
            const dx = pos[i3] - pos[j3];
            const dy = pos[i3 + 1] - pos[j3 + 1];
            const dz = pos[i3 + 2] - pos[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 8 && lineIdx < maxConnections * 6 - 6) {
              linePositions[lineIdx++] = pos[i3];
              linePositions[lineIdx++] = pos[i3 + 1];
              linePositions[lineIdx++] = pos[i3 + 2];
              linePositions[lineIdx++] = pos[j3];
              linePositions[lineIdx++] = pos[j3 + 1];
              linePositions[lineIdx++] = pos[j3 + 2];
            }
          }
        }

        particleGeo.attributes.position.needsUpdate = true;
        linesGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      pMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      pTexture.dispose();
      renderer.dispose();
    };
  }, [density, interactive]);

  return (
    <div
      ref={mountRef}
      className="three-canvas-container"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: height,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden"
      }}
      aria-hidden="true"
    />
  );
}
