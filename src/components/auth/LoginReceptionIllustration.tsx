'use client';

import React from 'react';

export const LoginReceptionIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 560 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="deskGrad" x1="120" y1="230" x2="430" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <linearGradient id="plantLeafGrad" x1="420" y1="180" x2="480" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="deskShine" x1="120" y1="240" x2="380" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* FLOOR GROUNDING ACCENTS & SHADOWS                              */}
        {/* ============================================================== */}
        <ellipse cx="280" cy="405" rx="220" ry="6" fill="#E2E8F0" opacity="0.7" />
        <line x1="60" y1="405" x2="160" y2="405" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="180" y1="405" x2="430" y2="405" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
        <line x1="450" y1="405" x2="510" y2="405" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="130" y1="414" x2="260" y2="414" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="280" y1="414" x2="380" y2="414" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />

        {/* Sparkle radial dots (Top left & around) */}
        <g opacity="0.65" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round">
          {/* Sparkle 1 */}
          <line x1="165" y1="175" x2="165" y2="167" />
          <line x1="165" y1="191" x2="165" y2="183" />
          <line x1="173" y1="179" x2="181" y2="179" />
          <line x1="157" y1="179" x2="149" y2="179" />
          <line x1="171" y1="173" x2="176" y2="168" />
          <line x1="159" y1="185" x2="154" y2="190" />
          <line x1="171" y1="185" x2="176" y2="190" />
          <line x1="159" y1="173" x2="154" y2="168" />

          {/* Sparkle 2 (center top) */}
          <line x1="375" y1="125" x2="375" y2="117" />
          <line x1="375" y1="141" x2="375" y2="133" />
          <line x1="383" y1="129" x2="391" y2="129" />
          <line x1="367" y1="129" x2="359" y2="129" />

          {/* Sparkle 3 (right side) */}
          <line x1="535" y1="240" x2="535" y2="232" />
          <line x1="535" y1="256" x2="535" y2="248" />
          <line x1="543" y1="244" x2="551" y2="244" />
          <line x1="527" y1="244" x2="519" y2="244" />
        </g>

        {/* ============================================================== */}
        {/* RECEPTIONIST (BEHIND DESK)                                     */}
        {/* ============================================================== */}
        <g id="receptionist">
          {/* Hair behind */}
          <path
            d="M305 160 C290 145 285 190 285 240 L345 240 C345 190 340 145 325 160 Z"
            fill="#312E81"
          />

          {/* Torso / Blouse */}
          <path
            d="M288 215 C288 200 300 195 315 195 C330 195 342 200 342 215 L346 242 L284 242 Z"
            fill="#FBCFE8"
          />
          {/* Collar detail */}
          <path d="M310 196 L315 204 L320 196 Z" fill="#F472B6" />

          {/* Neck */}
          <rect x="310" y="184" width="10" height="14" fill="#FED7AA" rx="2" />

          {/* Head */}
          <ellipse cx="315" cy="170" rx="16" ry="19" fill="#FED7AA" />

          {/* Face features: soft eyes & smile */}
          <ellipse cx="320" cy="171" rx="2" ry="2" fill="#1E293B" />
          <path d="M322 178 Q325 183 330 178" stroke="#E14D45" strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <circle cx="329" cy="175" r="2.5" fill="#F472B6" opacity="0.6" />

          {/* Hair Front / Bangs */}
          <path
            d="M300 170 C300 150 315 142 328 145 C340 148 340 162 338 175 C330 158 318 158 312 165 C308 170 304 175 300 170 Z"
            fill="#312E81"
          />
          <path
            d="M334 165 C336 178 338 190 340 215 C334 210 330 195 330 180 Z"
            fill="#312E81"
          />
        </g>

        {/* ============================================================== */}
        {/* RECEPTION DESK & COUNTER                                        */}
        {/* ============================================================== */}
        <g id="desk">
          {/* Main Counter Face */}
          <rect x="110" y="240" width="310" height="150" rx="8" fill="url(#deskGrad)" />

          {/* Counter Front Facet / Light Geometric Highlight */}
          <path
            d="M110 240 L380 240 L420 390 L110 390 Z"
            fill="url(#deskShine)"
          />

          {/* Top Counter Bar (Clean Overlap) */}
          <rect x="95" y="232" width="340" height="14" rx="4" fill="#3B82F6" />
          <rect x="95" y="232" width="340" height="4" rx="2" fill="#93C5FD" />

          {/* Terminal / Monitor on desk */}
          <rect x="180" y="218" width="46" height="20" rx="3" fill="#0F172A" />
          <rect x="183" y="221" width="40" height="14" rx="1.5" fill="#38BDF8" />
          {/* Stand */}
          <rect x="199" y="232" width="8" height="6" fill="#475569" />
          <rect x="195" y="237" width="16" height="2" rx="1" fill="#64748B" />
        </g>

        {/* ============================================================== */}
        {/* POTTED PLANT (RIGHT OF DESK)                                    */}
        {/* ============================================================== */}
        <g id="potted-plant">
          {/* Pot base shadow */}
          <ellipse cx="462" cy="396" rx="22" ry="4" fill="#94A3B8" opacity="0.6" />

          {/* Flower Pot */}
          <path
            d="M444 345 L480 345 L474 394 C474 397 471 399 468 399 L456 399 C453 399 450 397 450 394 Z"
            fill="#FBBF24"
          />
          <ellipse cx="462" cy="345" rx="18" ry="4" fill="#F59E0B" />
          {/* Soil */}
          <ellipse cx="462" cy="345" rx="15" ry="3" fill="#78350F" />

          {/* Main Plant Stem */}
          <path d="M462 344 Q460 270 464 195" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" />

          {/* Big Stylized Leaf (Left) */}
          <path
            d="M462 310 C430 310 410 275 422 245 C434 215 458 245 462 265 Z"
            fill="url(#plantLeafGrad)"
          />
          {/* Big Stylized Leaf (Center/Top) */}
          <path
            d="M462 265 C435 240 435 190 460 170 C485 150 490 200 466 235 Z"
            fill="#3B82F6"
          />
          {/* Big Stylized Leaf (Right/Middle) */}
          <path
            d="M463 290 C485 285 515 255 500 225 C485 195 465 230 463 260 Z"
            fill="url(#plantLeafGrad)"
          />
          {/* Leaf Contour Accents */}
          <path d="M461 280 Q435 255 428 248" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <path d="M464 240 Q475 220 490 215" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* ============================================================== */}
        {/* VISITOR / STUDENT (FRONT LEFT)                                 */}
        {/* ============================================================== */}
        <g id="visitor">
          {/* Visitor Shadow */}
          <ellipse cx="78" cy="404" rx="26" ry="5" fill="#94A3B8" opacity="0.6" />

          {/* Left Leg (Dark indigo trousers) */}
          <path
            d="M68 250 L66 372 L62 376 L62 396 C62 399 65 401 68 401 L78 401 L78 250 Z"
            fill="#1E293B"
          />
          {/* Left Shoe: white sneaker with coral sole */}
          <path d="M58 392 L78 392 L80 401 L54 401 C52 401 54 394 58 392 Z" fill="white" />
          <rect x="52" y="399" width="28" height="3" rx="1.5" fill="#E14D45" />

          {/* Right Leg */}
          <path
            d="M84 250 L84 372 L88 376 L88 396 C88 399 91 401 94 401 L104 401 L104 250 Z"
            fill="#334155"
          />
          {/* Right Shoe: white sneaker with coral sole */}
          <path d="M84 392 L104 392 L106 401 L80 401 C78 401 80 394 84 392 Z" fill="white" />
          <rect x="78" y="399" width="28" height="3" rx="1.5" fill="#E14D45" />

          {/* Yellow Sweater / Torso */}
          <path
            d="M52 195 C52 178 68 174 86 174 C104 174 120 178 120 195 L112 254 C112 258 108 262 104 262 L68 262 C64 262 60 258 60 254 Z"
            fill="#FBBF24"
          />
          {/* Sweater collar */}
          <ellipse cx="86" cy="177" rx="14" ry="5" fill="#F59E0B" />

          {/* Right Arm (bent forward resting on counter) */}
          <path
            d="M106 186 C124 195 152 215 178 225 L168 238 C144 230 118 208 102 198 Z"
            fill="#F59E0B"
          />
          {/* Right Hand */}
          <ellipse cx="178" cy="226" rx="6" ry="5" fill="#FED7AA" />

          {/* Left Arm & Briefcase */}
          {/* Left arm hanging down */}
          <path
            d="M60 186 C50 205 48 235 48 275 L58 275 C58 240 60 215 70 196 Z"
            fill="#F59E0B"
          />
          {/* Left Hand holding briefcase */}
          <ellipse cx="50" cy="280" rx="5" ry="6" fill="#FED7AA" />

          {/* Pink/Coral Briefcase */}
          <g id="briefcase">
            <rect x="22" y="286" width="46" height="36" rx="4" fill="#E14D45" />
            <rect x="22" y="286" width="46" height="8" rx="2" fill="#CC3F37" />
            {/* Handle */}
            <path
              d="M38 286 L38 277 C38 274 40 272 43 272 L47 272 C50 272 52 274 52 277 L52 286"
              stroke="#991B1B"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Clasp / Buckle */}
            <rect x="42" y="292" width="6" height="5" rx="1" fill="#FEF08A" />
          </g>

          {/* Head & Hair */}
          {/* Neck */}
          <rect x="81" y="166" width="10" height="12" fill="#FED7AA" rx="2" />
          {/* Head */}
          <ellipse cx="86" cy="154" rx="16" ry="18" fill="#FED7AA" />
          {/* Ear */}
          <ellipse cx="73" cy="155" rx="3.5" ry="5" fill="#FED7AA" />
          {/* Hair */}
          <path
            d="M71 155 C71 135 84 130 98 132 C108 134 107 146 104 152 C98 142 88 142 80 148 C77 150 74 153 71 155 Z"
            fill="#0F172A"
          />
          <path
            d="M68 150 C68 140 76 134 88 132 C82 135 77 141 77 150 Z"
            fill="#0F172A"
          />
        </g>
      </svg>
    </div>
  );
};
