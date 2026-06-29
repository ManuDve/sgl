import { useState, useEffect } from "react";
import { API_BASE } from "../../config/api";

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const SHIMMER = {
  background:
    "linear-gradient(90deg, var(--color-shimmer-card) 25%, var(--color-shimmer-card-hi) 50%, var(--color-shimmer-card) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.6s ease-in-out infinite",
} as const;

function SkeletonCard() {
  return (
    <div className="bg-sgl-gray rounded-xl border border-sgl-gray-light/10 px-6 py-5">
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-2/3 rounded" style={SHIMMER} />
        <div className="h-5 w-5 rounded" style={SHIMMER} />
      </div>
    </div>
  );
}

export default function ServiciosLanding() {
  const [services, setServices] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((body) => {
        setServices(body.data ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error || services.length === 0) {
    return (
      <p className="mt-12 font-sans text-base text-sgl-gray-mid">
        Los servicios no están disponibles en este momento.
      </p>
    );
  }

  return (
    <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
      {services.map((svc, i) => (
        <details
          key={svc.id}
          className="svc-card group bg-sgl-gray rounded-xl border border-sgl-gray-light/10 hover:border-sgl-gold/40 transition-colors duration-200"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <summary className="flex items-center justify-between gap-3 px-6 py-5 cursor-pointer select-none">
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-semibold text-sgl-white leading-snug">
                {svc.nombre}
              </h3>
            </div>
            <svg
              className="svc-chevron shrink-0 w-5 h-5 text-sgl-gray-mid"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 7.5l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>

          <div className="svc-body">
            <div>
              <div className="px-6 pb-6 pt-1 flex flex-col gap-4 border-t border-sgl-gold/10">
                <p className="font-sans text-sm text-sgl-gray-mid leading-relaxed">
                  {svc.descripcion}
                </p>
                <a
                  href="/agendar"
                  className="self-start bg-sgl-gold hover:bg-sgl-gold-light text-sgl-black font-semibold px-6 py-3 rounded transition-colors duration-200 text-sm"
                >
                  Agendar consulta
                </a>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
