import { useState, useEffect } from "react";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

type Phase = "idle" | "loading" | "success";

function formatCLP(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function CreateServiceModal({ onSuccess, onClose }: Props) {
  const [nombre,      setNombre]      = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio,      setPrecio]      = useState("");
  const [activo,      setActivo]      = useState(true);
  const [touched,     setTouched]     = useState({ nombre: false, precio: false });
  const [phase,       setPhase]       = useState<Phase>("idle");
  const [error,       setError]       = useState("");
  const [mounted,     setMounted]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "success") return;
    const t = setTimeout(() => onSuccess(), 1600);
    return () => clearTimeout(t);
  }, [phase, onSuccess]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && phase !== "loading") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, onClose]);

  const precioNum  = Math.floor(Number(precio));
  const nombreOk   = nombre.trim().length >= 2;
  const precioOk   = precio !== "" && !isNaN(precioNum) && precioNum >= 0;
  const nombreErr  = touched.nombre && !nombreOk;
  const precioErr  = touched.precio && !precioOk;

  async function handleSubmit() {
    setTouched({ nombre: true, precio: true });
    if (!nombreOk || !precioOk) return;

    const token = localStorage.getItem("sgl_token");
    if (!token) { window.location.href = "/admin/login"; return; }

    setPhase("loading");
    setError("");

    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8080/api'}/admin/services`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nombre.trim(),
          description: descripcion.trim() || null,
          price: precioNum,
          active: activo,
        }),
      });
      if (res.status === 401) {
        localStorage.removeItem("sgl_token");
        window.location.href = "/admin/login";
        return;
      }
      const body = await res.json();
      if (!res.ok) { setError(body.message ?? "Error al crear el servicio."); setPhase("idle"); return; }
      setPhase("success");
    } catch {
      setError("No se pudo conectar con el servidor.");
      setPhase("idle");
    }
  }

  const precioPreview = precioOk ? formatCLP(precioNum) : null;

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
        {phase === "success" ? (
          <div className="flex flex-col items-center gap-5 px-8 py-12">
            <div
              className="w-16 h-16 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center"
              style={{ animation: "fade-up 0.4s ease both" }}
            >
              <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-serif text-xl font-semibold text-sgl-white">Servicio creado</p>
              <p className="font-sans text-sm text-sgl-gray-mid mt-1">
                <span className="text-sgl-gold">{nombre}</span> fue registrado exitosamente.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-sgl-gold/20">
              <h3 className="font-serif text-lg font-semibold text-sgl-white">Nuevo servicio</h3>
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
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Nombre */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="create-nombre" className="font-sans text-sm text-sgl-gray-mid">
                  Nombre <span className="text-red-400">*</span>
                </label>
                <input
                  id="create-nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => { setNombre(e.target.value); if (touched.nombre) setError(""); }}
                  onBlur={() => setTouched((t) => ({ ...t, nombre: true }))}
                  disabled={phase === "loading"}
                  placeholder="Ej: Derecho de Familia"
                  className={`w-full bg-sgl-black border rounded-lg px-4 py-3 font-sans text-sm text-sgl-white
                    focus:outline-none focus:border-sgl-gold transition-colors duration-200 disabled:opacity-50
                    ${nombreErr ? "border-red-500" : "border-sgl-gold/40"}`}
                />
                {nombreErr && <p className="font-sans text-xs text-red-400">Mínimo 2 caracteres.</p>}
              </div>

              {/* Descripción */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="create-desc" className="font-sans text-sm text-sgl-gray-mid">
                  Descripción
                </label>
                <textarea
                  id="create-desc"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  disabled={phase === "loading"}
                  rows={3}
                  placeholder="Descripción del servicio…"
                  className="w-full bg-sgl-black border border-sgl-gold/40 rounded-lg px-4 py-3
                    font-sans text-sm text-sgl-white focus:outline-none focus:border-sgl-gold
                    transition-colors duration-200 disabled:opacity-50 resize-none"
                />
              </div>

              {/* Precio */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="create-precio" className="font-sans text-sm text-sgl-gray-mid">
                  Precio (CLP) <span className="text-red-400">*</span>
                </label>
                <div className={`flex items-center bg-sgl-black border rounded-lg overflow-hidden
                  transition-colors duration-200
                  ${precioErr ? "border-red-500" : "border-sgl-gold/40 focus-within:border-sgl-gold"}`}>
                  <span className="font-sans text-sm text-sgl-gray-mid select-none pl-4 pr-2">$</span>
                  <input
                    id="create-precio"
                    type="number"
                    min={0}
                    step={1}
                    value={precio}
                    onChange={(e) => { setPrecio(e.target.value); if (touched.precio) setError(""); }}
                    onBlur={() => setTouched((t) => ({ ...t, precio: true }))}
                    disabled={phase === "loading"}
                    placeholder="85000"
                    className="flex-1 bg-transparent pr-4 py-3 font-sans text-sm text-sgl-white
                      focus:outline-none disabled:opacity-50 [appearance:textfield]
                      [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  {precioPreview && (
                    <span className="font-sans text-xs text-sgl-gold pr-4 shrink-0">{precioPreview}</span>
                  )}
                </div>
                {precioErr && <p className="font-sans text-xs text-red-400">Ingresa un precio válido (0 o mayor).</p>}
              </div>

              {/* Activo */}
              <div
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setActivo((v) => !v)}
              >
                <div
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
                    activo ? "bg-sgl-gold" : "bg-sgl-gray-mid/30"
                  }`}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                    style={{ transform: activo ? "translateX(22px)" : "translateX(2px)" }}
                  />
                </div>
                <span className="font-sans text-sm text-sgl-gray-mid">
                  Servicio {activo ? "activo" : "inactivo"}
                </span>
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
                onClick={handleSubmit}
                disabled={phase === "loading"}
                className="bg-sgl-gold hover:bg-sgl-gold-light text-sgl-black font-semibold rounded
                  transition-colors duration-200 inline-flex items-center gap-2"
                style={{
                  padding: "10px 28px",
                  opacity: phase === "loading" ? 0.7 : 1,
                  cursor: phase === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {phase === "loading" && (
                  <span className="w-4 h-4 border-2 border-sgl-black/30 border-t-sgl-black rounded-full animate-spin" />
                )}
                {phase === "loading" ? "Creando…" : "Crear servicio"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
