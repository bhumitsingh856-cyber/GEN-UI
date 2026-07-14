import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { 
  Loader2, 
  Sparkles, 
  Code2, 
  Layout, 
  Palette, 
  CheckCircle, 
  Clock,
  FileCode,
  GitBranch,
  Zap,
  Cpu,
  Boxes,
  Terminal,
  Eye
} from "lucide-react";

const GeneratingOverlay = ({ prompt }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [dots, setDots] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [filesGenerated, setFilesGenerated] = useState(0);
  const [componentsGenerated, setComponentsGenerated] = useState(0);
  const [linesGenerated, setLinesGenerated] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const logContainerRef = useRef(null);

  // Phases with detailed info
  const phases = [
    { 
      icon: Sparkles, 
      title: "Understanding your prompt",
      description: "Analyzing requirements and context",
      subtext: "Natural language processing",
      duration: 3000
    },
    { 
      icon: Layout, 
      title: "Designing component structure",
      description: "Mapping out the UI architecture",
      subtext: "Component tree generation",
      duration: 3500
    },
    { 
      icon: Code2, 
      title: "Writing React components",
      description: "Generating clean, production-ready code",
      subtext: "JSX + Javascript",
      duration: 4000
    },
    { 
      icon: Palette, 
      title: "Applying styles & animations",
      description: "Adding Tailwind classes and motion effects",
      subtext: "Responsive design",
      duration: 3000
    },
    { 
      icon: Eye, 
      title: "Optimizing & finalizing",
      description: "Polishing and bundling your UI",
      subtext: "Production ready",
      duration: 2500
    }
  ];

  // Rich log messages
  const logMessages = [
    "✨ Parsing component tree...",
    "📦 Resolving dependencies...",
    "🎨 Applying color palette...",
    "🔄 Optimizing bundle size...",
    "📝 Generating TypeScript definitions...",
    "🎯 Aligning layout grid...",
    "⚡ Adding micro-interactions...",
    "🧹 Cleaning up unused imports...",
    "📐 Calculating responsive breakpoints...",
    "🔍 Running accessibility checks...",
    "💅 Polishing component styles...",
    "🚀 Preparing for deployment...",
    "📊 Analyzing component hierarchy...",
    "🔧 Configuring Tailwind plugins...",
    "📁 Creating file structure...",
    "🎭 Setting up animations...",
    "📦 Bundling dependencies...",
    "✨ Optimizing performance..."
  ];

  // Progress simulation - 2-3 minutes
  useEffect(() => {
    let progressInterval;
    let startTime = Date.now();
    const totalDuration = 150000; // 2.5 minutes average

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      
      // Add slight randomness to make it feel natural
      const randomFactor = 0.95 + Math.random() * 0.1;
      const newProgress = Math.min(calculatedProgress * randomFactor, 99.5);
      
      setProgress(newProgress);
      
      // Update phase based on progress
      const phaseIndex = Math.min(
        Math.floor((newProgress / 100) * phases.length),
        phases.length - 1
      );
      setCurrentPhase(phaseIndex);

      // Randomly generate stats
      if (Math.random() > 0.6) {
        setFilesGenerated(prev => prev + Math.floor(Math.random() * 2) + 1);
      }
      if (Math.random() > 0.7) {
        setComponentsGenerated(prev => prev + Math.floor(Math.random() * 1) + 1);
      }
      if (Math.random() > 0.5) {
        setLinesGenerated(prev => prev + Math.floor(Math.random() * 10) + 5);
      }

      // Add random log
      if (Math.random() > 0.5 && newProgress < 95) {
        const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
        setLogs(prev => [...prev.slice(-15), { 
          message: randomLog, 
          time: new Date().toLocaleTimeString(),
          id: Date.now() 
        }]);
      }

      // Complete
      if (newProgress >= 99.5) {
        clearInterval(progressInterval);
        setProgress(100);
        setIsComplete(true);
        setShowConfetti(true);
        // Add final logs
        setLogs(prev => [...prev.slice(-15), 
          { message: "✅ Build completed successfully!", time: new Date().toLocaleTimeString(), id: Date.now() + 1 },
          { message: "🚀 UI is ready for preview!", time: new Date().toLocaleTimeString(), id: Date.now() + 2 }
        ]);
      }
    };

    progressInterval = setInterval(updateProgress, 200);

    return () => clearInterval(progressInterval);
  }, []);

  // Dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Timer - increases with seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const progressPercentage = Math.round(progress);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Confetti particles
  const ConfettiParticle = ({ delay, x, color }) => (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ 
        background: color,
        left: `${x}%`,
        top: '-10px'
      }}
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{ 
        y: '110vh', 
        rotate: 360 * (Math.random() * 2 + 1),
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 3 + Math.random() * 2,
        delay: delay,
        ease: "easeIn"
      }}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-violet-500/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-3xl" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(50)].map((_, i) => (
              <ConfettiParticle 
                key={i}
                delay={Math.random() * 2}
                x={Math.random() * 100}
                color={['#22d3ee', '#818cf8', '#34d399', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 5)]}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-8 overflow-hidden">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Logo></Logo>
            <div>
              <p className="text-sm text-white/40">
                {isComplete ? '✨ Generation Complete' : `Generating your UI${dots}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-xl">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-white/60 tabular-nums">
                {formatTime(elapsed)}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-xl">
              <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-green-400' : 'bg-cyan-400'} animate-pulse`} />
              <span className="text-sm font-medium text-white/60">
                {isComplete ? 'Ready' : `${progressPercentage}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          
          {/* Left Column - Progress & Phases */}
          <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto">
            {/* Progress Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-white/60">Overall Progress</span>
                <span className="text-2xl font-bold text-cyan-400 font-mono">
                  {progressPercentage}%
                </span>
              </div>
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                {!isComplete && progress < 100 && (
                  <motion.div
                    className="absolute inset-y-0 left-0 w-32 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-white/30">
                  {isComplete ? '✅ Complete' : `~${Math.ceil((100 - progress) / 10)}s remaining`}
                </span>
                <span className="text-xs text-white/30">
                  {Math.round((progress / 100) * phases.length)}/{phases.length} phases
                </span>
              </div>
            </div>

            {/* Phase Timeline */}
            <div className="flex-1 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-y-auto">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">
                Build Phases
              </h3>
              <div className="space-y-3">
                {phases.map((phase, index) => {
                  const PhaseIcon = phase.icon;
                  const isActive = index === currentPhase;
                  const isDone = index < currentPhase;
                  const isPending = index > currentPhase;

                  return (
                    <motion.div
                      key={index}
                      className={`relative p-3 rounded-xl transition-all duration-500 ${
                        isActive ? 'bg-cyan-500/10 border border-cyan-500/20 shadow-lg shadow-cyan-500/5' :
                        isDone ? 'bg-green-500/5 border border-green-500/10' :
                        'bg-white/5 border border-white/5 opacity-40'
                      }`}
                      animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${
                          isActive ? 'bg-cyan-500/20 text-cyan-400' :
                          isDone ? 'bg-green-500/20 text-green-400' :
                          'bg-white/5 text-white/30'
                        }`}>
                          <PhaseIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${
                              isActive ? 'text-white' :
                              isDone ? 'text-white/70' :
                              'text-white/30'
                            }`}>
                              {phase.title}
                            </span>
                            {isDone && (
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            )}
                            {isActive && (
                              <motion.div
                                className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              />
                            )}
                          </div>
                          <p className={`text-xs mt-0.5 ${
                            isActive ? 'text-white/60' :
                            isDone ? 'text-white/40' :
                            'text-white/20'
                          }`}>
                            {phase.description}
                          </p>
                          <p className={`text-[10px] mt-0.5 font-mono ${
                            isActive ? 'text-cyan-400/60' :
                            isDone ? 'text-white/30' :
                            'text-white/10'
                          }`}>
                            {phase.subtext}
                          </p>
                        </div>
                      </div>
                      {isActive && !isComplete && (
                        <motion.div
                          className="absolute -bottom-px left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Logs */}
          <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-1">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white/40">Files</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  {filesGenerated}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Boxes className="w-4 h-4 text-violet-400" />
                  <span className="text-xs text-white/40">Components</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  {componentsGenerated}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-white/40">Lines</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  {linesGenerated}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-white/40">Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-green-400' : 'bg-cyan-400'} animate-pulse`} />
                  <span className="text-sm font-medium text-white">
                    {isComplete ? 'Done' : `${progressPercentage}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* Prompt Card */}
            <div className="flex-shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/30 mb-1">Your Prompt</p>
                  <p className="text-sm text-white/80 truncate">"{prompt}"</p>
                </div>
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex-shrink-0"
                  >
                    ✓ Ready
                  </motion.div>
                )}
              </div>
            </div>

            {/* Terminal Logs */}
            <div className="flex-1 min-h-0 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <Terminal className="w-3.5 h-3.5 text-white/30 ml-2" />
                  <span className="text-xs text-white/30 font-mono">Terminal</span>
                </div>
                <span className="text-xs text-white/20 font-mono">
                  {logs.length} events
                </span>
              </div>
              <div 
                ref={logContainerRef}
                className="h-[calc(100%-44px)] overflow-y-auto p-4 font-mono text-xs space-y-1"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.06) transparent'
                }}
              >
                <AnimatePresence>
                  {logs.length === 0 ? (
                    <div className="text-white/20 animate-pulse">Initializing build process...</div>
                  ) : (
                    logs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-2 text-white/70 hover:bg-white/5 px-2 py-0.5 rounded transition-colors"
                      >
                        <span className="text-white/20 text-[10px] tabular-nums flex-shrink-0">
                          [{log.time}]
                        </span>
                        <span className="break-all">{log.message}</span>
                      </motion.div>
                    ))
                  )}
                  {!isComplete && progress < 95 && (
                    <motion.div
                      key="cursor"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-1.5 h-3 bg-cyan-400/50 ml-1"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-4 text-xs text-white/30">
                <span>React 18</span>
                <span className="w-px h-3 bg-white/10" />
                <span>Tailwind CSS</span>
                <span className="w-px h-3 bg-white/10" />
                <span>Framer Motion</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/20">
                <GitBranch className="w-3 h-3" />
                <span>main • v2.0.0</span>
                {!isComplete && (
                  <>
                    <span className="w-px h-3 bg-white/10" />
                    <motion.div
                      className="flex items-center gap-1.5"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-1 h-1 rounded-full bg-amber-400" />
                      <span>Building...</span>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GeneratingOverlay;