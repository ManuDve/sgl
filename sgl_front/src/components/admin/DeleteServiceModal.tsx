import { useState, useEffect } from "react";

interface Service {
  id: number;
  name: string;
}

interface Props {
  service: Service;
  onSuccess: () => void;
  onClose: () => void;
}

type Phase = "idle" | "loading" | "deleted" | "deactivated";

export default function DeleteServiceModal({ service, onSuccess, onClose }: Props) {
  const [phase,   setPhase]   = useState<Phase>("idle");
  const [error,   setError]   = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "deleted" && phase !== "deactivated") return;
    const t = setTimeout(() => onSuccess(), 2000);
    return () => clearTimeout(t);
  }, [phase, onSuccess]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && phase !== "loading") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, onClose]);

  async function handleDelete() {
    const token = localStorage.getItem("sgl_token");
    if (!token) { window.location.href = "/admin/login"; return; }

    setPhase("loading");
    setError("");

    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8080/api'}/admin/services/${service.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("sgl_token");
        window.location.href = "/admin/login";
        return;
      }
      const body = await res.json();
      if (!res.ok) { setError(body.message ?? "Error al eliminar el servicio."); setPhase("idle"); return; }
      // data !== null → soft-delete (servicio desactivado); null → eliminado físicamente
      setPhase(body.data !== null ? "deactivated" : "deleted");
    } catch {
      setError("No se pudo conectar con el servidor.");
      setPhase("idle");
    }
  }

  const isSuccess = phase === "deleted" || phase === "deactivated";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 50, background: `rgba(0,0,0,${mounted ? 0.7 : 0})`, transition: "background 200ms ease" }}
      onClick={phase !== "loading" ? onClose : undefined}
    >
      <div
        className="bg-sgl-gray border border-sgl-gold/40 rounded-xl w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          opacity:   mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          transition: mounted
            ? "opacity 280ms cubic-bezier(0.16,1,0.3,1), transform 280ms cubic-bezier(0.16,1,0.3,1)"
            : "none",
        }}
      >
        {isSuccess ? (
          <div className="flex flex-col items-center gap-5 px-8 py-12">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                phase === "deleted"
                  ? "bg-green-500/15 border-green-500/40"
                  : "bg-sgl-gold/10 border-sgl-gold/40"
              }`}
              style={{ animation: "fade-up 0.4s ease both" }}
            >
              <svg
                className={`w-8 h-8 ${phase === "deleted" ? "text-green-400" : "text-sgl-gold"}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-serif text-xl font-semibold text-sgl-white">
                {phase === "deleted" ? "Servicio eliminado" : "Servicio desactivado"}
              </p>
              <p className="font-sans text-sm text-sgl-gray-mid mt-1 leading-relaxed">
                {phase === "deleted" ? (
                  <><span className="text-sgl-gold">{service.name}</span> fue eliminado permanentemente.</>
                ) : (
                  <><span className="text-sgl-gold">{service.name}</span> tiene citas asociadas
                    y fue <span className="text-sgl-white font-semibold">desactivado</span> en lugar de eliminado.</>
                )}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-sgl-gold/20">
              <h3 className="font-serif text-lg font-semibold text-sgl-white">Eliminar servicio</h3>
              {phase !== "loading" && (
                <button onClick={onClose} aria-label="Cerrar"
                  className="text-sgl-gray-mid hover:text-sgl-white transition-colors p-1 rounded">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {/* Body */}
            <div className="px-6 py-6 flex flex-col gap-4">
              <p className="font-sans text-sm text-sgl-gray-mid">
                ¿Eliminar{" "}
                <span className="text-sgl-white font-semibold">"{service.name}"</span>?
                Esta acción no se puede deshacer.
              </p>
              <div className="bg-sgl-gold/5 border border-sgl-gold/20 rounded-lg px-4 py-3">
                <p className="font-sans text-xs text-sgl-gray-mid leading-relaxed">
                  <span className="text-sgl-gold font-semibold">Nota:</span> Si el servicio tiene
                  citas asociadas, será{" "}
                  <span className="text-sgl-white font-semibold">desactivado</span>{" "}
                  en lugar de eliminado definitivamente.
                </p>
              </div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 font-sans text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-sgl-gold/10 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                disabled={phase === "loading"}
                className="border border-sgl-gold/40 text-sgl-gold hover:border-sgl-gold hover:bg-sgl-gold/10
                  font-semibold rounded transition-colors duration-200"
                style={{ padding: "10px 24px", opacity: phase === "loading" ? 0.4 : 1 }}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={phase === "loading"}
                className="bg-red-500/80 hover:bg-red-500 text-white font-semibold rounded
                  transition-colors duration-200 inline-flex items-center gap-2"
                style={{
                  padding: "10px 28px",
                  opacity: phase === "loading" ? 0.7 : 1,
                  cursor: phase === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {phase === "loading" && (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {phase === "loading" ? "Eliminando…" : "Sí, eliminar"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
