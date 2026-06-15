import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, useProgress, Html } from "@react-three/drei";

// Register the Google-hosted Draco decoder path to support Draco-compressed 3D GLB models
useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

// Model loader component
function Model() {
  const { scene } = useGLTF("/polystone_compounds.glb");
  return <primitive object={scene} />;
}

// Custom progress loader component
function StallLoader() {
  const { progress } = useProgress();
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-card/60 backdrop-blur rounded-3xl border border-white/10 shadow-glow min-w-[280px]">
      <div className="relative h-20 w-20 flex items-center justify-center">
        {/* Spinner ring */}
        <div className="absolute inset-0 rounded-full border-4 border-brand-cyan/20 border-t-brand-cyan animate-spin" />
        {/* Percentage text */}
        <span className="font-display font-bold text-sm text-brand-cyan">
          {Math.round(progress)}%
        </span>
      </div>
      <h3 className="font-display font-semibold text-lg mt-6 text-foreground">
        Loading Polystone Compounds
      </h3>
      <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
        Streaming the 3D Polystone Compounds asset (9.5MB). This may take a moment depending on your disk/connection speed.
      </p>
      
      {/* Progress bar indicator */}
      <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
        <div 
          className="h-full rounded-full bg-gradient-warm transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// React Error Boundary to catch WebGL / GPU errors and render a clean fallback
class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ThreeJS Canvas Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-[450px] md:h-[600px] rounded-3xl overflow-hidden glass border border-white/10 flex flex-col items-center justify-center p-8 text-center bg-card/30">
          <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
            ⚠️
          </div>
          <h3 className="font-display font-bold text-lg text-foreground">Failed to render 3D Model</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            The 3D model could not be rendered, possibly due to GPU limits or file loading issues.
          </p>
          <pre className="mt-4 p-3 bg-black/40 rounded-lg text-xs text-brand-magenta max-w-lg overflow-auto">
            {this.state.error?.message || "WebGL Context Error"}
          </pre>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-6 px-5 py-2 text-xs font-semibold rounded-full bg-gradient-warm text-white hover:opacity-90 transition"
          >
            Retry Loading
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function StallModel() {
  const [mounted, setMounted] = useState(false);

  // Defer rendering to the client side only to avoid server-side WebGL errors during SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full h-[450px] md:h-[600px] rounded-3xl overflow-hidden glass border border-white/10 flex flex-col items-center justify-center p-6 bg-card/30">
        <div className="h-10 w-10 rounded-full border-4 border-brand-cyan/20 border-t-brand-cyan animate-spin" />
        <span className="text-xs text-muted-foreground mt-4 font-medium">Preparing 3D environment...</span>
      </div>
    );
  }

  return (
    <ThreeErrorBoundary>
      <div className="relative w-full h-[450px] md:h-[600px] rounded-3xl overflow-hidden glass border border-white/10 group">
        {/* Ambient backglow */}
        <div className="absolute inset-0 bg-radial-gradient from-brand-cyan/5 via-transparent to-transparent pointer-events-none -z-10" />

        <Canvas 
          camera={{ position: [8, 8, 8], fov: 45 }} 
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<Html center><StallLoader /></Html>}>
            {/* Automatic studio lighting setup */}
            <Stage 
              intensity={0.7} 
              environment="city" 
              adjustCamera={1.3} 
              shadows="contact"
            >
              <Model />
            </Stage>
            {/* Interactive orbit controls */}
            <OrbitControls 
              makeDefault 
              enableZoom={true} 
              minDistance={2} 
              maxDistance={50} 
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>

        {/* Hover/Interaction helper overlays */}
        <div className="absolute bottom-4 left-4 pointer-events-none flex gap-2">
          <span className="rounded-full bg-black/50 border border-white/5 backdrop-blur px-3.5 py-1.5 text-xs text-muted-foreground/90 font-medium">
            🖱️ Drag to rotate
          </span>
          <span className="rounded-full bg-black/50 border border-white/5 backdrop-blur px-3.5 py-1.5 text-xs text-muted-foreground/90 font-medium">
            🔍 Scroll to zoom
          </span>
        </div>
      </div>
    </ThreeErrorBoundary>
  );
}

// Preload model to cache it
useGLTF.preload("/polystone_compounds.glb");
