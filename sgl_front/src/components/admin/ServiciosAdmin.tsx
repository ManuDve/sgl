import { useState, useEffect, useCallback } from "react";
import CreateServiceModal from "./CreateServiceModal";
import EditServiceModal from "./EditServiceModal";
import EditPriceModal from "./EditPriceModal";
import DeleteServiceModal from "./DeleteServiceModal";

// ── Tipos ──────────────────────────────────────────────────────

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  active: boolean;
}

// ── Helpers ────────────────────────────────────────────────────

function formatCLP(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

// ── Skeleton ──────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-sgl-gold/10 animate-pulse">
      <td className="px-4 py-4">
        <div className="h-3.5 w-40 bg-sgl-gray-mid/20 rounded mb-1.5" />
        <div className="h-3 w-56 bg-sgl-gray-mid/10 rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="h-3.5 w-20 bg-sgl-gray-mid/20 rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="h-5 w-16 bg-sgl-gray-mid/15 rounded-full" />
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          <div className="h-7 w-24 bg-sgl-gray-mid/15 rounded" />
          <div className="h-7 w-16 bg-sgl-gray-mid/15 rounded" />
          <div className="h-7 w-20 bg-sgl-gray-mid/10 rounded" />
        </div>
      </td>
    </tr>
  );
}

// ── Componente principal ──────────────────────────────────────

export default function ServiciosAdmin() {
  const [services,        setServices]        = useState<Service[]>([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState("");

  const [showCreate,      setShowCreate]      = useState(false);
  const [priceService,    setPriceService]    = useState<Service | null>(null);
  const [editService,     setEditService]     = useState<Service | null>(null);
  const [deleteService,   setDeleteService]   = useState<Service | null>(null);

  const fetchServices = useCallback(() => {
    const token = localStorage.getItem("sgl_token");
    if (!token) { window.location.href = "/admin/login"; return; }

    setLoading(true);
    setError("");

    fetch("http://localhost:8080/api/admin/services", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("sgl_token");
          window.location.href = "/admin/login";
          return null;
        }
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((body) => { if (body) setServices(body.data ?? []); })
      .catch(() => setError("No se pudo conectar con el servidor."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  function closeAndRefresh() {
    setShowCreate(false);
    setPriceService(null);
    setEditService(null);
    setDeleteService(null);
    fetchServices();
  }

  const COLS = ["Servicio", "Precio", "Estado", "Acciones"];

  return (
    <>
      {/* Modales */}
      {showCreate && (
        <CreateServiceModal onSuccess={closeAndRefresh} onClose={() => setShowCreate(false)} />
      )}
      {priceService && (
        <EditPriceModal
          service={priceService}
          onSuccess={closeAndRefresh}
          onClose={() => setPriceService(null)}
        />
      )}
      {editService && (
        <EditServiceModal
          service={editService}
          onSuccess={closeAndRefresh}
          onClose={() => setEditService(null)}
        />
      )}
      {deleteService && (
        <DeleteServiceModal
          service={deleteService}
          onSuccess={closeAndRefresh}
          onClose={() => setDeleteService(null)}
        />
      )}

      {/* Cabecera */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2
          className="font-serif text-2xl md:text-3xl font-semibold text-sgl-white"
          style={{ animation: "fade-in 300ms ease-out forwards" }}
        >
          Servicios
        </h2>
        <div className="flex items-center gap-4">
          {!loading && !error && (
            <span className="font-sans text-sm text-sgl-gray-mid">
              {services.length} servicio{services.length !== 1 ? "s" : ""}
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="bg-sgl-gold hover:bg-sgl-gold-light text-sgl-black font-semibold rounded
              transition-colors duration-200 inline-flex items-center gap-2"
            style={{ padding: "8px 18px" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo servicio
          </button>
        </div>
      </div>

      {/* Tabla */}
      {loading ? (
        <div className="overflow-x-auto rounded-lg border border-sgl-gold/10">
          <table className="w-full font-sans text-sm">
            <thead>
              <tr className="bg-sgl-gray border-b border-sgl-gold/10">
                {COLS.map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-sgl-gold uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
            </tbody>
          </table>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-5 py-4 text-red-400 font-sans text-sm">
          {error}
        </div>
      ) : services.length === 0 ? (
        <div className="bg-sgl-gray border border-sgl-gold/10 rounded-lg px-6 py-12 text-center text-sgl-gray-mid font-sans text-sm">
          No hay servicios registrados.{" "}
          <button
            onClick={() => setShowCreate(true)}
            className="text-sgl-gold hover:underline"
          >
            Crear el primero
          </button>
        </div>
      ) : (
        <div
          className="overflow-x-auto rounded-lg border border-sgl-gold/10"
          style={{ animation: "fade-in 300ms ease-out forwards" }}
        >
          <table className="w-full font-sans text-sm">
            <thead>
              <tr className="bg-sgl-gray border-b border-sgl-gold/10">
                {COLS.map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-sgl-gold uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((svc, i) => (
                <tr
                  key={svc.id}
                  className={`border-b border-sgl-gold/10 transition-colors duration-150 ${
                    i % 2 === 0 ? "bg-sgl-black" : "bg-sgl-gray/50"
                  }`}
                  style={{
                    opacity: 0,
                    animation: `fade-up 280ms cubic-bezier(0.16,1,0.3,1) ${i * 50}ms forwards`,
                  }}
                >
                  {/* Nombre + descripción */}
                  <td className="px-4 py-4">
                    <div className="font-sans text-sm font-medium text-sgl-white">{svc.name}</div>
                    {svc.description && (
                      <div className="font-sans text-xs text-sgl-gray-mid mt-0.5 max-w-xs truncate">
                        {svc.description}
                      </div>
                    )}
                  </td>

                  {/* Precio */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-sans text-sm font-semibold text-sgl-gold">
                      {formatCLP(svc.price)}
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        svc.active
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-sgl-gray-mid/20 text-sgl-gray-mid border border-sgl-gray-mid/30"
                      }`}
                    >
                      {svc.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {/* Editar precio */}
                      <button
                        type="button"
                        onClick={() => setPriceService(svc)}
                        className="border border-sgl-gold/40 text-sgl-gold text-xs font-semibold rounded
                          hover:border-sgl-gold hover:bg-sgl-gold/10 transition-colors duration-200"
                        style={{ padding: "5px 12px" }}
                        title="Actualizar precio"
                      >
                        Precio
                      </button>

                      {/* Editar datos */}
                      <button
                        type="button"
                        onClick={() => setEditService(svc)}
                        className="border border-sgl-gray-mid/40 text-sgl-gray-mid text-xs font-semibold rounded
                          hover:border-sgl-white/50 hover:text-sgl-white transition-colors duration-200"
                        style={{ padding: "5px 12px" }}
                        title="Editar nombre y descripción"
                      >
                        Editar
                      </button>

                      {/* Eliminar */}
                      <button
                        type="button"
                        onClick={() => setDeleteService(svc)}
                        className="border border-red-500/30 text-red-400 text-xs font-semibold rounded
                          hover:border-red-500/60 hover:bg-red-500/10 transition-colors duration-200"
                        style={{ padding: "5px 12px" }}
                        title="Eliminar servicio"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
