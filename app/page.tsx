'use client';

import { useRouter } from 'next/navigation';
import { Play, Zap, Clock, TrendingUp, Sparkles, ArrowRight, Video, MessageSquare } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-4 md:px-8 py-6">
        <div className="text-xl font-bold tracking-wider">REELPILOT.</div>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</a>
          <a href="#features" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Features</a>
          <a href="#workflow" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Workflow</a>
          <button
            onClick={() => router.push('/workflow')}
            className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
        <button
          onClick={() => router.push('/workflow')}
          className="md:hidden px-4 py-2 bg-white text-black rounded-full font-medium text-sm cursor-pointer"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden">
        {/* Glowing orb effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-radial from-blue-500/30 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Fireflies - More particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float shadow-glow-blue"></div>
          <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float-delay-1 shadow-glow-blue"></div>
          <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-float-delay-2 shadow-glow-blue"></div>
          <div className="absolute top-60 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-float-delay-3 shadow-glow-blue"></div>
          <div className="absolute top-1/3 left-1/5 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float-delay-4 shadow-glow-blue"></div>
          <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-blue-500 rounded-full animate-float-delay-5 shadow-glow-blue"></div>
          <div className="absolute top-1/4 right-2/5 w-1 h-1 bg-blue-400 rounded-full animate-float-delay-6 shadow-glow-blue"></div>
          <div className="absolute bottom-1/4 left-2/5 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float-delay-7 shadow-glow-blue"></div>
        </div>

        {/* Badge */}
        <div className="relative z-10 mb-6 md:mb-8 px-4 md:px-6 py-2 border border-gray-800 rounded-full text-xs md:text-sm text-gray-400 backdrop-blur-sm">
          World's Most Adopted Social Media Automation
        </div>

        {/* Main Headline */}
        <div className="relative z-10 text-center max-w-5xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight px-4">
            Revolutionizing
            <br />
            <span className="text-blue-400">Social Media</span>
            {' '}with AI
          </h1>

          <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-12 px-4 max-w-2xl mx-auto">
            Automate your Facebook video posts with visual workflows. No coding required.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <button
              onClick={() => router.push('/workflow')}
              className="w-full sm:w-auto px-8 md:px-12 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors inline-flex items-center justify-center gap-3 group cursor-pointer"
            >
              Start Automating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 md:px-12 py-3 md:py-4 bg-gray-900 border border-gray-800 hover:border-gray-700 text-white rounded-full font-medium transition-colors cursor-pointer">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="features" className="relative py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium whitespace-nowrap cursor-pointer">
              Overview
            </button>
            <button className="px-6 py-2 bg-gray-900 text-gray-400 rounded-full font-medium hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer">
              Analytics
            </button>
            <button className="px-6 py-2 bg-gray-900 text-gray-400 rounded-full font-medium hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer">
              Workflows
            </button>
          </div>

          {/* Dashboard Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left Side - Features */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Automation
                  <br />
                  Overview
                </h2>

                <div className="mt-8 space-y-6">
                  {/* Feature Card */}
                  <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl cursor-pointer hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Play className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold">Visual Builder</div>
                          <div className="text-sm text-blue-100">Drag & Drop</div>
                        </div>
                      </div>
                      <Sparkles className="w-6 h-6 text-blue-200" />
                    </div>
                    <div className="h-16 flex items-end gap-1">
                      {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-white/30 rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-colors cursor-pointer">
                      <Zap className="w-8 h-8 text-blue-400 mb-2" />
                      <div className="text-sm text-gray-400">Fast Setup</div>
                      <div className="text-2xl font-bold">2 min</div>
                    </div>
                    <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-colors cursor-pointer">
                      <TrendingUp className="w-8 h-8 text-blue-400 mb-2" />
                      <div className="text-sm text-gray-400">Success Rate</div>
                      <div className="text-2xl font-bold">99.9%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Workflow List */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Active Workflows</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Facebook Posts', status: 'Running', progress: 75 },
                    { name: 'Video Queue', status: 'Running', progress: 60 },
                    { name: 'Caption Manager', status: 'Running', progress: 90 },
                    { name: 'Scheduler', status: 'Active', progress: 45 },
                    { name: 'Analytics', status: 'Monitoring', progress: 100 },
                  ].map((workflow, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium">{workflow.name}</div>
                          <div className="text-sm text-gray-500">{workflow.status}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all"
                            style={{ width: `${workflow.progress}%` }}
                          ></div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">2min</div>
              <div className="text-sm md:text-base text-gray-400">Setup Time</div>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm md:text-base text-gray-400">Automation</div>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">99%</div>
              <div className="text-sm md:text-base text-gray-400">Success Rate</div>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-sm md:text-base text-gray-400">Workflows</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Ready to Automate Your
            <br />
            <span className="text-blue-400">Social Media?</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 px-4">
            Join thousands of creators automating their content
          </p>
          <button
            onClick={() => router.push('/workflow')}
            className="px-8 md:px-12 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base md:text-lg font-medium transition-colors inline-flex items-center gap-3 group cursor-pointer"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm md:text-base">
          <p>© 2024 ReelPilot. Built for content creators.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120px) translateX(60px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-float-delay-1 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 0.7s;
        }

        .animate-float-delay-2 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1.4s;
        }

        .animate-float-delay-3 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 2.1s;
        }

        .animate-float-delay-4 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 2.8s;
        }

        .animate-float-delay-5 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 3.5s;
        }

        .animate-float-delay-6 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 4.2s;
        }

        .animate-float-delay-7 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 4.9s;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .shadow-glow-blue {
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.8), 0 0 20px rgba(96, 165, 250, 0.4);
        }
      `}</style>
    </div>
  );
}
