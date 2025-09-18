export default function RetroMusicEffects() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true" role="presentation">
      {/* Discos Giratórios com Reflexão de Luz */}
      <div className="disco-effects">
        {/* Disco 1 - Top Left */}
        <div className="absolute top-[15%] left-[20%] w-20 h-20 md:w-24 md:h-24">
          <div className="relative w-full h-full">
            {/* Disco base */}
            <div className="disco-spinning absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 via-purple-500/40 to-pink-500/30 border-2 border-yellow-400/20" />
            
            {/* Reflexão central */}
            <div className="disco-reflection absolute top-1/2 left-1/2 w-8 h-8 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-white/80 via-yellow-300/60 to-transparent" style={{ willChange: 'transform, opacity' }} />
            
            {/* Faixa de luz refletida */}
            <div className="light-streak absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-300/80 to-transparent transform -translate-y-1/2" style={{ willChange: 'opacity' }} />
          </div>
        </div>

        {/* Disco 2 - Top Right */}
        <div className="absolute top-[25%] right-[15%] w-16 h-16 md:w-20 md:h-20">
          <div className="relative w-full h-full">
            <div className="disco-spinning-reverse absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 via-purple-600/40 to-blue-500/30 border-2 border-cyan-400/20" style={{ animationDelay: '0.5s' }} />
            <div className="disco-reflection absolute top-1/2 left-1/2 w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-white/70 via-cyan-300/50 to-transparent" style={{ animationDelay: '1s', willChange: 'transform, opacity' }} />
            <div className="light-streak absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent transform -translate-y-1/2" style={{ animationDelay: '1s', willChange: 'opacity' }} />
          </div>
        </div>

        {/* Disco 3 - Bottom Center */}
        <div className="absolute bottom-[30%] left-1/2 w-14 h-14 md:w-18 md:h-18 -translate-x-1/2">
          <div className="relative w-full h-full">
            <div className="disco-spinning-slow absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/30 via-purple-500/40 to-red-500/30 border-2 border-pink-400/20" style={{ animationDelay: '1.5s' }} />
            <div className="disco-reflection absolute top-1/2 left-1/2 w-5 h-5 md:w-6 md:h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-white/60 via-pink-300/40 to-transparent" style={{ animationDelay: '2s', willChange: 'transform, opacity' }} />
            <div className="light-streak absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-300/60 to-transparent transform -translate-y-1/2" style={{ animationDelay: '2s', willChange: 'opacity' }} />
          </div>
        </div>
      </div>

      {/* Feixes de Luz Radiantes */}
      <div className="light-beam-effects">
        {/* Feixe Rosa - Diagonal Top Right */}
        <div className="absolute top-[10%] right-[10%] w-32 h-1 md:w-48 md:h-1">
          <div className="light-beam-radiant bg-gradient-to-r from-transparent via-pink-400/60 to-transparent transform rotate-45 origin-left" style={{ animationDelay: '0.5s', willChange: 'transform, opacity' }} />
          <div className="light-glow absolute -top-2 -bottom-2 left-0 right-0 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent transform rotate-45 origin-left blur-sm" style={{ animationDelay: '0.5s', opacity: '0.6' }} />
        </div>

        {/* Feixe Azul - Diagonal Bottom Left */}
        <div className="absolute bottom-[20%] left-[10%] w-28 h-1 md:w-40 md:h-1">
          <div className="light-beam-radiant bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transform -rotate-45 origin-left" style={{ animationDelay: '1.2s', willChange: 'transform, opacity' }} />
          <div className="light-glow absolute -top-2 -bottom-2 left-0 right-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transform -rotate-45 origin-left blur-sm" style={{ animationDelay: '1.2s', opacity: '0.6' }} />
        </div>

        {/* Feixe Verde - Horizontal Center */}
        <div className="absolute top-1/2 left-[5%] w-36 h-1 md:w-52 md:h-1 -translate-y-1/2">
          <div className="light-beam-radiant bg-gradient-to-r from-transparent via-green-400/50 to-transparent" style={{ animationDelay: '2s', willChange: 'transform, opacity' }} />
          <div className="light-glow absolute -top-2 -bottom-2 left-0 right-0 bg-gradient-to-r from-transparent via-green-400/15 to-transparent blur-sm" style={{ animationDelay: '2s', opacity: '0.6' }} />
        </div>
      </div>

      {/* Ondas Sonoras dos Equipamentos */}
      <div className="sound-wave-effects">
        {/* Rádio 1 - Left Side */}
        <div className="absolute top-[40%] left-[8%] w-16 h-16 md:w-20 md:h-20">
          <div className="sound-wave-ring absolute inset-0 rounded-full border-2 border-yellow-400/40" style={{ willChange: 'transform, opacity' }} />
          <div className="sound-wave-ring absolute inset-2 rounded-full border-2 border-yellow-400/30" style={{ animationDelay: '0.5s', willChange: 'transform, opacity' }} />
          <div className="sound-wave-ring absolute inset-4 rounded-full border-2 border-yellow-400/20" style={{ animationDelay: '1s', willChange: 'transform, opacity' }} />
        </div>

        {/* Toca-fitas - Right Side */}
        <div className="absolute top-[55%] right-[12%] w-14 h-14 md:w-18 md:h-18">
          <div className="sound-wave-ring absolute inset-0 rounded-full border-2 border-purple-400/40" style={{ animationDelay: '0.3s', willChange: 'transform, opacity' }} />
          <div className="sound-wave-ring absolute inset-2 rounded-full border-2 border-purple-400/30" style={{ animationDelay: '0.8s', willChange: 'transform, opacity' }} />
          <div className="sound-wave-ring absolute inset-4 rounded-full border-2 border-purple-400/20" style={{ animationDelay: '1.3s', willChange: 'transform, opacity' }} />
        </div>

        {/* Caixa de Som - Bottom Right */}
        <div className="absolute bottom-[15%] right-[20%] w-12 h-12 md:w-16 md:h-16">
          <div className="sound-wave-ring absolute inset-0 rounded-full border-2 border-cyan-400/40" style={{ animationDelay: '0.7s', willChange: 'transform, opacity' }} />
          <div className="sound-wave-ring absolute inset-2 rounded-full border-2 border-cyan-400/30" style={{ animationDelay: '1.2s', willChange: 'transform, opacity' }} />
          <div className="sound-wave-ring absolute inset-4 rounded-full border-2 border-cyan-400/20" style={{ animationDelay: '1.7s', willChange: 'transform, opacity' }} />
        </div>
      </div>

      {/* Sparkle Effects */}
      <div className="sparkle-effects">
        <div className="sparkle absolute top-[20%] left-[30%] w-1 h-1 bg-white" style={{ animationDelay: '0.2s', willChange: 'transform, opacity' }} />
        <div className="sparkle absolute top-[35%] right-[25%] w-1 h-1 bg-yellow-300" style={{ animationDelay: '1.5s', willChange: 'transform, opacity' }} />
        <div className="sparkle absolute bottom-[40%] left-[15%] w-1 h-1 bg-pink-300" style={{ animationDelay: '2.8s', willChange: 'transform, opacity' }} />
        <div className="sparkle absolute bottom-[25%] right-[35%] w-1 h-1 bg-cyan-300" style={{ animationDelay: '3.5s', willChange: 'transform, opacity' }} />
        <div className="sparkle absolute top-[50%] left-[50%] w-1 h-1 bg-purple-300" style={{ animationDelay: '4.2s', willChange: 'transform, opacity' }} />
      </div>
    </div>
  );
}