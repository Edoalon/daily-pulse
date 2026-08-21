import React from "react";

export interface BrandVisual {
  name: string;
  keywords: string[];
  bgGradient: string;
  badgeBg: string;
  textColor: string;
  glowColor: string;
  renderLogo: (className?: string) => React.ReactNode;
}

/**
 * Strict brand definitions.
 * ONLY specific, unambiguous corporate/project brand names.
 * Never include generic industry terms (like "agent framework", "tensor", "gpu", "repository").
 */
export const BRAND_ENTRIES: readonly BrandVisual[] = [
  {
    name: "Slack",
    keywords: ["slack", "slackbot"],
    bgGradient: "from-[#360d3a] via-[#4A154B] to-[#2b0c2e]",
    badgeBg: "bg-white/15 text-pink-200 border-white/20",
    textColor: "text-white",
    glowColor: "rgba(236, 178, 46, 0.25)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 128 128" fill="none">
        <path d="M28.3 79.5a13.3 13.3 0 1 1-13.3-13.3h13.3v13.3zm6.6 0a13.3 13.3 0 1 1 26.6 0v33.2a13.3 13.3 0 1 1-26.6 0V79.5z" fill="#E01E5A" />
        <path d="M48.2 28.3a13.3 13.3 0 1 1 13.3-13.3v13.3H48.2zm0 6.6a13.3 13.3 0 1 1 0 26.6H15a13.3 13.3 0 1 1 0-26.6h33.2z" fill="#36C5F0" />
        <path d="M99.7 48.2a13.3 13.3 0 1 1 13.3 13.3H99.7V48.2zm-6.6 0a13.3 13.3 0 1 1-26.6 0V15a13.3 13.3 0 1 1 26.6 0v33.2z" fill="#2EB67D" />
        <path d="M79.5 99.7a13.3 13.3 0 1 1-13.3 13.3V99.7h13.3zm0-6.6a13.3 13.3 0 1 1 0-26.6H113a13.3 13.3 0 1 1 0 26.6H79.5z" fill="#ECB22E" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    keywords: ["openai", "chatgpt", "gpt-4", "gpt-5", "o1-mini", "o1-preview", "dall-e", "sora"],
    bgGradient: "from-[#080d14] via-[#0f1923] to-[#04241e]",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    textColor: "text-emerald-400",
    glowColor: "rgba(16, 163, 127, 0.3)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-9.67-4.52a4.463 4.463 0 0 1-.535-3.007l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.56a4.5 4.5 0 0 1-6.15-1.65zm-1.874-9.92a4.46 4.46 0 0 1 2.35-1.954V11.6a.766.766 0 0 0 .386.677l5.836 3.37-2.02 1.168a.076.076 0 0 1-.067 0L3.43 13.987a4.5 4.5 0 0 1-1.714-6zM17.18 11.6l-5.837-3.37 2.02-1.167a.078.078 0 0 1 .067 0l4.841 2.793a4.503 4.503 0 0 1 1.714 6.002 4.46 4.46 0 0 1-2.35 1.954V12.28a.766.766 0 0 0-.455-.68zm2.25 2.822l-.142-.085-4.78-2.759a.774.774 0 0 0-.783 0L7.882 14.95v-2.332a.076.076 0 0 1 .033-.062l4.83-2.79a4.5 4.5 0 0 1 6.685 4.654zm-8.87-3.69l-2.02-1.168a.07.07 0 0 1-.038-.052V3.93a4.5 4.5 0 0 1 7.37-3.453l-.142.08-4.779 2.758a.795.795 0 0 0-.391.681v6.737zm1.1-1.895l2.605-1.503 2.605 1.503v3.007l-2.605 1.504-2.605-1.504z" />
      </svg>
    ),
  },
  {
    name: "Anthropic",
    keywords: ["anthropic", "claude", "claude 3", "claude 3.5", "sonnet", "haiku", "opus"],
    bgGradient: "from-[#1a110d] via-[#2a1b14] to-[#3a2216]",
    badgeBg: "bg-[#D97757]/20 text-[#F3A588] border-[#D97757]/40",
    textColor: "text-[#F3A588]",
    glowColor: "rgba(217, 119, 87, 0.35)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.827 2.003h3.766L24 21.997h-3.766l-1.879-5.267h-6.71l-1.88 5.267H6l6.407-17.994h1.42zm1.642 9.775L13.88 7.42l-1.589 4.358h3.178zM2.87 14.51h3.364L3.62 22H.255l2.615-7.49z" />
      </svg>
    ),
  },
  {
    name: "NVIDIA",
    keywords: ["nvidia", "geforce", "cuda", "blackwell", "jensen huang", "rtx", "h100", "b200"],
    bgGradient: "from-[#081206] via-[#0e1d0a] to-[#12280d]",
    badgeBg: "bg-[#76B900]/20 text-[#8CE300] border-[#76B900]/40",
    textColor: "text-[#76B900]",
    glowColor: "rgba(118, 185, 0, 0.35)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.93 7.82c0-.18.15-.33.33-.33 1.94 0 3.73.66 5.17 1.87a.34.34 0 0 0 .46-.02l1.64-1.63a.34.34 0 0 0-.02-.49C14.47 5.48 11.97 4.5 9.26 4.5c-4.47 0-8.1 3.63-8.1 8.1 0 4.47 3.63 8.1 8.1 8.1 3.52 0 6.54-2.25 7.66-5.43.08-.23-.05-.47-.28-.53l-2.24-.55a.33.33 0 0 0-.39.21c-.72 2.05-2.69 3.51-5 3.51-2.92 0-5.3-2.38-5.3-5.3 0-2.93 2.38-5.3 5.3-5.3h.02c.86 0 1.68.21 2.4.58.17.09.37.03.46-.13l1.19-1.92a.33.33 0 0 0-.13-.45A6.09 6.09 0 0 0 8.93 7.82z" />
      </svg>
    ),
  },
  {
    name: "Google",
    keywords: ["google", "deepmind", "gemini", "gemma", "google cloud"],
    bgGradient: "from-[#081120] via-[#0d1c33] to-[#0a2744]",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    textColor: "text-blue-400",
    glowColor: "rgba(66, 133, 244, 0.3)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    name: "Meta",
    keywords: ["meta", "llama", "llama 3", "zuckerberg", "meta ai"],
    bgGradient: "from-[#051124] via-[#091f42] to-[#041e42]",
    badgeBg: "bg-[#0668E1]/20 text-[#459bfb] border-[#0668E1]/40",
    textColor: "text-[#459bfb]",
    glowColor: "rgba(6, 104, 225, 0.35)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6.25c-2.39 0-4.44 1.48-5.36 3.63C5.7 7.74 3.97 6.25 1.93 6.25.86 6.25 0 7.15 0 8.27v8.52C0 17.91.86 18.8 1.93 18.8c2.14 0 3.95-1.63 4.79-3.92.9 2.22 2.92 3.87 5.28 3.87 2.37 0 4.38-1.65 5.28-3.87.84 2.29 2.65 3.92 4.79 3.92 1.07 0 1.93-.89 1.93-2.01V8.27c0-1.12-.86-2.02-1.93-2.02-2.04 0-3.77 1.49-4.71 3.63-.92-2.15-2.97-3.63-5.36-3.63zm-5.78 7.37c-.45 1.57-1.64 2.76-3.08 2.89v-6.9c1.47.14 2.65 1.34 3.08 2.91v1.1zm11.56 0v-1.1c.43-1.57 1.61-2.77 3.08-2.91v6.9c-1.44-.13-2.63-1.32-3.08-2.89zm-5.78 2.68c-1.78 0-3.23-1.48-3.23-3.3 0-1.83 1.45-3.3 3.23-3.3s3.23 1.47 3.23 3.3c0 1.82-1.45 3.3-3.23 3.3z" />
      </svg>
    ),
  },
  {
    name: "Microsoft",
    keywords: ["microsoft", "copilot", "azure ai", "nadella"],
    bgGradient: "from-[#0a121c] via-[#101d2d] to-[#12283e]",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    textColor: "text-sky-400",
    glowColor: "rgba(0, 164, 239, 0.3)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="1" y="1" width="10" height="10" fill="#F25022" />
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
        <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
      </svg>
    ),
  },
  {
    name: "Apple",
    keywords: ["apple intelligence", "apple silicon", "m4 max", "m5", "tim cook"],
    bgGradient: "from-[#141416] via-[#1f1f23] to-[#16161a]",
    badgeBg: "bg-white/10 text-gray-200 border-white/20",
    textColor: "text-white",
    glowColor: "rgba(255, 255, 255, 0.2)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.56.65-1.06 1.72-.93 2.74 1.01.08 2.04-.49 2.66-1.24z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    keywords: ["github"],
    bgGradient: "from-[#0e1117] via-[#161b22] to-[#1f242c]",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    textColor: "text-purple-300",
    glowColor: "rgba(168, 85, 247, 0.25)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    keywords: ["hugging face", "huggingface"],
    bgGradient: "from-[#1a1608] via-[#2d220a] to-[#3a2c0c]",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    textColor: "text-amber-400",
    glowColor: "rgba(245, 158, 11, 0.35)",
    renderLogo: (className = "h-10 w-10") => (
      <span className={`flex items-center justify-center text-3xl select-none ${className}`}>🤗</span>
    ),
  },
  {
    name: "Mistral AI",
    keywords: ["mistral", "mistral-large", "codestral", "pixtral", "mixtral"],
    bgGradient: "from-[#1f0d05] via-[#2f1408] to-[#3d1a0a]",
    badgeBg: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    textColor: "text-orange-400",
    glowColor: "rgba(253, 94, 8, 0.35)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h4v4H3V3zm7 0h4v4h-4V3zm7 0h4v4h-4V3zM3 10h4v4H3v-4zm14 0h4v4h-4v-4zM3 17h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4z" />
      </svg>
    ),
  },
  {
    name: "DeepSeek",
    keywords: ["deepseek", "deepseek-r1", "deepseek-v3"],
    bgGradient: "from-[#08152c] via-[#0d2146] to-[#091b38]",
    badgeBg: "bg-blue-600/20 text-blue-300 border-blue-500/40",
    textColor: "text-blue-400",
    glowColor: "rgba(29, 78, 216, 0.35)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: "Salesforce",
    keywords: ["salesforce", "agentforce"],
    bgGradient: "from-[#051829] via-[#092942] to-[#061e33]",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    textColor: "text-cyan-400",
    glowColor: "rgba(0, 161, 224, 0.3)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
  },
  {
    name: "AWS",
    keywords: ["aws", "amazon web services", "amazon bedrock"],
    bgGradient: "from-[#141b24] via-[#1d2733] to-[#232f3e]",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    textColor: "text-amber-400",
    glowColor: "rgba(255, 153, 0, 0.3)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.08.192-.24.336l-1.024.752c-.088.064-.176.096-.256.096-.08 0-.176-.04-.28-.128a4.97 4.97 0 0 1-.584-.664 3.73 3.73 0 0 1-.368-.832c-.752.928-1.744 1.392-2.975 1.392-.936 0-1.688-.272-2.256-.816-.56-.552-.848-1.288-.848-2.2 0-.96.328-1.736.984-2.328.664-.6 1.584-.904 2.76-.904.384 0 .76.04 1.128.112.376.064.72.168 1.04.304v-.704c0-.776-.192-1.336-.576-1.672-.376-.344-.952-.512-1.72-.512-.4 0-.808.064-1.224.192-.416.12-.8.28-1.152.48-.128.08-.224.08-.288.024a.69.69 0 0 1-.168-.288l-.368-1.12c-.032-.104-.032-.192 0-.256.04-.08.112-.144.224-.208.432-.24.96-.44 1.584-.6.632-.16 1.32-.24 2.064-.24 1.368 0 2.384.344 3.048 1.024.672.672 1.008 1.688 1.008 3.04v4.544zm-4.704-.04c.328 0 .664-.064 1.008-.192.352-.136.648-.328.896-.584.184-.184.32-.408.408-.664.088-.264.136-.576.136-.936v-.528a7.08 7.08 0 0 0-.88-.24 4.54 4.54 0 0 0-.944-.096c-.664 0-1.176.144-1.536.432-.36.28-.536.68-.536 1.2 0 .432.128.776.384 1.032.264.256.624.384 1.08.384zM12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
      </svg>
    ),
  },
  {
    name: "PyTorch",
    keywords: ["pytorch"],
    bgGradient: "from-[#1f0a06] via-[#2f100a] to-[#3a150c]",
    badgeBg: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    textColor: "text-[#EE4C2C]",
    glowColor: "rgba(238, 76, 44, 0.35)",
    renderLogo: (className = "h-10 w-10") => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.923 1.5a.75.75 0 0 0-1.18.614v2.793a.75.75 0 0 0 .524.717c3.486 1.08 6.01 4.32 6.01 8.151 0 4.706-3.818 8.525-8.526 8.525-4.707 0-8.525-3.819-8.525-8.525 0-3.83 2.524-7.07 6.01-8.151a.75.75 0 0 0 .524-.717V2.114a.75.75 0 0 0-1.18-.614C2.96 4.394 0 8.745 0 13.775 0 20.25 5.25 25.5 11.725 25.5S23.45 20.25 23.45 13.775c0-5.03-2.96-9.38-6.527-12.275zm4.84 5.34a.75.75 0 0 0-1.06 0l-1.06 1.06a.75.75 0 1 0 1.06 1.06l1.06-1.06a.75.75 0 0 0 0-1.06z" />
      </svg>
    ),
  },
  {
    name: "LangChain",
    keywords: ["langchain", "langgraph", "langsmith"],
    bgGradient: "from-[#081712] via-[#0d261e] to-[#0a1e17]",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    textColor: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.35)",
    renderLogo: (className = "h-10 w-10") => (
      <span className={`text-3xl select-none ${className}`}>🦜</span>
    ),
  },
];

/**
 * Escapes regex special characters in a keyword.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Resolves a tailored brand visual ONLY if the brand is explicitly the subject of the article
 * (checked via strict word boundaries in the TITLE, SOURCE NAME, or exact TAGS).
 * We strictly avoid searching arbitrary body summaries to prevent false-positive visual misattribution.
 */
export function resolveBrandVisual(
  title: string,
  _summary?: string,
  tags: string[] = [],
  sourceName?: string
): BrandVisual | null {
  // Target only the primary headline and source identifiers
  const headline = (title || "").toLowerCase();
  const source = (sourceName || "").toLowerCase();
  const tagList = tags.map((t) => (t || "").toLowerCase());

  for (const brand of BRAND_ENTRIES) {
    for (const kw of brand.keywords) {
      const kwLower = kw.toLowerCase();
      // Strict regex with word boundaries
      const regex = new RegExp(`\\b${escapeRegex(kwLower)}\\b`, "i");

      // 1. Exact match in title (e.g. "Slack Launches...")
      if (regex.test(headline)) {
        return brand;
      }

      // 2. Exact match in sourceName (e.g. "OpenAI Blog")
      if (regex.test(source)) {
        return brand;
      }

      // 3. Exact match in tag (e.g. tag is exactly "Slack" or "OpenAI")
      if (tagList.some((t) => t === kwLower)) {
        return brand;
      }
    }
  }

  return null;
}
