"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ─── DATOS ────────────────────────────────────────────────────────────────────

const categorias = [
  {
    nombre: "Porcelana",
    productos: [
      { id: 1, nombre: "Plato de mesa 25cm", precio: 490 },
      { id: 2, nombre: "Plato de entrada 21cm", precio: 430 },
      { id: 3, nombre: "Plato de postre 19cm", precio: 430 },
      { id: 4, nombre: "Cazuela", precio: 390 },
      { id: 5, nombre: "Set taza de té + plato + cuchara", precio: 700 },
      { id: 6, nombre: "Set taza de café + plato + cuchara", precio: 700 },
      { id: 7, nombre: "Salero", precio: 200 },
      { id: 8, nombre: "Pimentero", precio: 200 },
      { id: 9, nombre: "Cenicero", precio: 300 },
    ],
  },
  {
    nombre: "Acero inoxidable",
    productos: [
      { id: 10, nombre: "Tenedor de mesa", precio: 350 },
      { id: 11, nombre: "Tenedor de postre", precio: 350 },
      { id: 12, nombre: "Cuchillo de mesa", precio: 350 },
      { id: 13, nombre: "Cuchara", precio: 350 },
      { id: 14, nombre: "Cuchara de postre", precio: 350 },
      { id: 15, nombre: "Cuchara de café", precio: 150 },
      { id: 16, nombre: "Hielera con pinza", precio: 1950 },
      { id: 17, nombre: "Bandeja acero inoxidable 29cm", precio: 3500 },
      { id: 18, nombre: "Bandeja acero inoxidable mozo", precio: 4000 },
    ],
  },
  {
    nombre: "Cristal",
    productos: [
      { id: 19, nombre: "Copa de agua / vino", precio: 350 },
      { id: 20, nombre: "Copa de champagne", precio: 350 },
      { id: 21, nombre: "Vaso Oslo", precio: 350 },
      { id: 22, nombre: "Jarra 1,25lt", precio: 1400 },
    ],
  },
  {
    nombre: "Panera",
    productos: [
      { id: 23, nombre: "Panera mimbre 22cm", precio: 1000 },
    ],
  },
  {
    nombre: "Mantelería",
    productos: [
      { id: 24, nombre: "Mantel blanco", precio: 5000 },
      { id: 25, nombre: "Servilleta símil tela", precio: 250 },
      { id: 26, nombre: "Cubre silla + lazo", precio: 2000 },
      { id: 27, nombre: "Camino de mesa", precio: 2000 },
    ],
  },
  {
    nombre: "Picadas",
    productos: [
      { id: 28, nombre: "Picada Clásica", precio: 12000 },
      { id: 29, nombre: "Picada Premium", precio: 18000 },
      { id: 30, nombre: "Picada Gourmet", precio: 25000 },
    ],
  },
];

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

const estilos = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

  .wina-page { font-family: 'DM Sans', system-ui, sans-serif; background: #F8F5F0; color: #1A1A2E; min-height: 100vh; }
  .wina-serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  /* INTRO: ABOUT + FORM LADO A LADO */
  .wina-intro { display: grid; grid-template-columns: 1fr; gap: 28px; }
  @media (min-width: 720px) { .wina-intro { grid-template-columns: 1fr 1.4fr; align-items: start; } }

  /* ABOUT */
  .wina-ig-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 18px; border-radius: 100px;
    border: 1.5px solid #E8E2D9; background: white;
    color: #1A1A2E; text-decoration: none;
    font-size: 14px; font-weight: 600;
    font-family: 'DM Sans', system-ui, sans-serif;
    transition: all 0.18s;
  }
  .wina-ig-btn:hover { border-color: #C13584; color: #C13584; }

  /* TABS */
  .wina-tabbar { position: sticky; top: 0; z-index: 50; background: white; border-bottom: 1px solid #E8E2D9; display: flex; overflow-x: auto; gap: 6px; padding: 10px 14px; scrollbar-width: none; }
  .wina-tabbar::-webkit-scrollbar { display: none; }
  .wina-tab { white-space: nowrap; padding: 7px 15px; border-radius: 100px; font-size: 13.5px; font-weight: 500; cursor: pointer; border: 1.5px solid #E8E2D9; background: white; color: #6B6560; transition: all 0.18s; font-family: 'DM Sans', system-ui, sans-serif; flex-shrink: 0; }
  .wina-tab:hover { border-color: #9B7653; color: #9B7653; }
  .wina-tab.activo { background: #1A1A2E; color: #F8F5F0; border-color: #1A1A2E; }

  /* CARDS */
  .wina-card { background: white; border-radius: 15px; padding: 17px 15px; border: 1.5px solid #E8E2D9; transition: border-color 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; }
  .wina-card.seleccionado { border-color: #9B7653; box-shadow: 0 3px 16px rgba(155,118,83,0.14); }

  /* QTY */
  .wina-qtybtn { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid #E8E2D9; background: white; font-size: 18px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #1A1A2E; transition: all 0.15s; font-family: inherit; }
  .wina-qtybtn:hover { background: #1A1A2E; color: white; border-color: #1A1A2E; }
  .wina-qtybtn:active { transform: scale(0.92); }
  .wina-qtyinput { width: 52px; text-align: center; font-size: 20px; font-weight: 700; font-family: 'DM Sans', system-ui, sans-serif; color: #1A1A2E; border: none; background: transparent; outline: none; -moz-appearance: textfield; }
  .wina-qtyinput::-webkit-outer-spin-button, .wina-qtyinput::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

  /* INPUTS DEL FORMULARIO */
  .wina-input { width: 100%; border: 1.5px solid #E8E2D9; border-radius: 10px; padding: 13px 15px; font-size: 14.5px; font-family: 'DM Sans', system-ui, sans-serif; color: #1A1A2E; background: #FAFAF8; outline: none; transition: border-color 0.2s; }
  .wina-input:focus { border-color: #9B7653; background: white; }
  .wina-input::placeholder { color: #BABABA; }

  /* GRILLAS */
  .wina-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  @media (max-width: 740px) { .wina-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 460px) { .wina-grid { grid-template-columns: 1fr; } }
  .wina-formgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
  @media (max-width: 540px) { .wina-formgrid { grid-template-columns: 1fr; } }

  /* BOTÓN BARRA INFERIOR */
  .wina-presbtn { background: white; color: #1A1A2E; border: none; padding: 13px 22px; border-radius: 100px; font-size: 14.5px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', system-ui, sans-serif; transition: background 0.18s; white-space: nowrap; }
  .wina-presbtn:hover { background: #F0EBE4; }
  @media (max-width: 460px) { .wina-presbtn { font-size: 13px; padding: 11px 14px; } }

  /* BOTONES DEL MODAL */
  .wina-btn-pdf { display: flex; align-items: center; gap: 8px; background: #1A1A2E; color: white; border: none; padding: 14px 22px; border-radius: 100px; font-size: 14.5px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', system-ui, sans-serif; transition: background 0.18s; }
  .wina-btn-pdf:hover { background: #2D3748; }
  .wina-btn-wa { display: flex; align-items: center; gap: 8px; background: #25D366; color: white; border: none; padding: 14px 22px; border-radius: 100px; font-size: 14.5px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', system-ui, sans-serif; transition: background 0.18s; }
  .wina-btn-wa:hover { background: #1CB954; }
  @media (max-width: 480px) { .wina-btn-pdf, .wina-btn-wa { font-size: 13px; padding: 12px 16px; } }

  /* MODAL */
  .wina-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 200; display: flex; align-items: flex-end; justify-content: center; }
  @media (min-width: 620px) { .wina-overlay { align-items: center; } }
  .wina-modal { background: white; border-radius: 24px 24px 0 0; width: 100%; max-width: 640px; max-height: 92vh; overflow-y: auto; padding: 28px 24px 36px; }
  @media (min-width: 620px) { .wina-modal { border-radius: 24px; } }

  /* SOLO AL IMPRIMIR */
  .presupuesto-print-only { display: none; }
  @media print {
    @page { size: A4; margin: 1.5cm; }
    .wina-page { display: none !important; }
    .wina-overlay { display: none !important; }
    .presupuesto-print-only {
      display: block !important;
      width: 100%;
    }
  }
`;

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function Home() {
  const todosLosProductos = categorias.flatMap((c) => c.productos);

  const [cantidades, setCantidades] = useState<Record<number, number>>(() => {
    const init: Record<number, number> = {};
    todosLosProductos.forEach((p) => { init[p.id] = 0; });
    return init;
  });

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [invitados, setInvitados] = useState("");
  const [catActiva, setCatActiva] = useState("Datos personales");
  const [verPresupuesto, setVerPresupuesto] = useState(false);

  // Resalta el tab según la sección visible al scrollear
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setCatActiva(target.dataset.cat ?? "");
          }
        });
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    const datosSec = document.getElementById("cat-Datos personales");
    if (datosSec) observer.observe(datosSec);
    categorias.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.nombre}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const modificarCantidad = (id: number, delta: number) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  const total = todosLosProductos.reduce(
    (sum, p) => sum + p.precio * cantidades[p.id], 0
  );

  const itemsSeleccionados = todosLosProductos.filter(
    (p) => cantidades[p.id] > 0
  ).length;

  // Categorías con sus productos seleccionados (para modal y PDF)
  const resumenProductos = categorias
    .map((cat) => ({
      nombre: cat.nombre,
      items: cat.productos
        .filter((p) => cantidades[p.id] > 0)
        .map((p) => ({
          nombre: p.nombre,
          qty: cantidades[p.id],
          subtotal: p.precio * cantidades[p.id],
        })),
    }))
    .filter((cat) => cat.items.length > 0);

  // Fechas para el presupuesto
  const hoy = new Date().toLocaleDateString("es-AR", {
    day: "numeric", month: "long", year: "numeric",
  });
  const validoHasta = new Date();
  validoHasta.setDate(validoHasta.getDate() + 30);
  const validoHastaStr = validoHasta.toLocaleDateString("es-AR", {
    day: "numeric", month: "long", year: "numeric",
  });

  const scrollToCategoria = (cat: string) => {
    setCatActiva(cat);
    document.getElementById(`cat-${cat}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const enviarWhatsApp = () => {
    const detalle = categorias
      .map((cat) => {
        const items = cat.productos
          .filter((p) => cantidades[p.id] > 0)
          .map((p) => `- ${p.nombre} x${cantidades[p.id]}`)
          .join("\n");
        return items ? `${cat.nombre.toUpperCase()}\n${items}` : "";
      })
      .filter(Boolean)
      .join("\n\n");

    const mensaje = encodeURIComponent(
      `Hola Wina Eventos!\n\nDATOS DEL CLIENTE\nNombre: ${nombre}\nTeléfono: ${telefono}\nFecha del evento: ${fecha}\nInvitados: ${invitados}\n\nPRODUCTOS SOLICITADOS\n${detalle}\n\nTOTAL ESTIMADO: $${total.toLocaleString("es-AR")}\n\nPresupuesto válido hasta: ${validoHastaStr}`
    );
    window.open(`https://wa.me/5492364581199?text=${mensaje}`, "_blank");
  };

  const handlePrint = async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();

    // Cargar logo como base64
    const logoData = await fetch("/logo.png")
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })
      );

    // ── LOGO ──
    doc.addImage(logoData, "PNG", 14, 10, 45, 22);

    // ── TÍTULO ──
    doc.setFontSize(22);
    doc.setTextColor(155, 118, 83); // copper #9B7653
    doc.setFont("helvetica", "bold");
    doc.text("Presupuesto", 14, 44);

    // ── FECHA Y CIUDAD ──
    doc.setFontSize(10);
    doc.setTextColor(155, 118, 83);
    doc.setFont("helvetica", "bold");
    doc.text(`Fecha: ${hoy}`, 14, 52);
    doc.setTextColor(107, 101, 96);
    doc.setFont("helvetica", "normal");
    doc.text("Ciudad de La Plata", pageWidth - 14, 52, { align: "right" });

    // ── SEPARADOR ──
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 56, pageWidth - 14, 56);

    // ── DATOS DEL CLIENTE ──
    let y = 64;
    doc.setFontSize(10);
    doc.setTextColor(26, 26, 46);
    doc.setFont("helvetica", "bold");
    doc.text("Cliente", 14, y);
    doc.text("Fecha del evento", pageWidth / 2, y);

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    if (nombre) {
      doc.text(`Nombre: ${nombre}`, 14, y);
      y += 5;
    }
    if (telefono) {
      doc.text(`Telefono: ${telefono}`, 14, y);
    }
    if (fecha) {
      doc.text(fecha, pageWidth / 2, y - (nombre ? 5 : 0));
    }
    if (invitados) {
      doc.text(`Invitados: ${invitados}`, pageWidth / 2, y);
    }

    y += 10;

    // ── SEPARADOR ──
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, pageWidth - 14, y);
    y += 4;

    // ── TABLA DE PRODUCTOS ──
    const filas: any[][] = [];
    resumenProductos.forEach((cat) => {
      filas.push([
        {
          content: cat.nombre,
          colSpan: 4,
          styles: {
            fontStyle: "bold" as const,
            fontSize: 9,
            fillColor: [248, 245, 240] as [number, number, number],
            textColor: [26, 26, 46] as [number, number, number],
            cellPadding: 3,
          },
        },
      ]);
      cat.items.forEach((item) => {
        const precioUnit = Math.round(item.subtotal / item.qty);
        filas.push([
          item.nombre,
          item.qty,
          `$${precioUnit.toLocaleString("es-AR")}`,
          `$${item.subtotal.toLocaleString("es-AR")}`,
        ]);
      });
    });

    autoTable(doc, {
      startY: y,
      head: [["Descripción", "Cantidad", "Precio unitario", "Precio total"]],
      body: filas,
      theme: "striped",
      headStyles: {
        fillColor: [26, 26, 46],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
      },
      columnStyles: {
        0: { cellWidth: "auto", halign: "left" },
        1: { cellWidth: 25, halign: "center" },
        2: { cellWidth: 38, halign: "right" },
        3: { cellWidth: 38, halign: "right" },
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
        lineColor: [232, 226, 217],
      },
      alternateRowStyles: {
        fillColor: [248, 245, 240],
      },
    });

    // ── TOTAL ──
    const finalY = (doc as any).lastAutoTable.finalY + 6;
    doc.setDrawColor(200, 200, 200);
    doc.line(pageWidth / 2, finalY, pageWidth - 14, finalY);

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(155, 118, 83);
    doc.text(
      `$${total.toLocaleString("es-AR")}`,
      pageWidth - 14,
      finalY + 8,
      { align: "right" }
    );

    // ── PIE ──
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 101, 96);
    doc.text(
      `* Precios orientativos vigentes al ${hoy}. Para eventos con fecha posterior a los 30 dias, los valores se confirmaran al momento de la reserva.`,
      14,
      finalY + 20,
      { maxWidth: pageWidth - 28 }
    );
    doc.text(
      "La Plata, City Bell y alrededores · @winaeventos",
      14,
      finalY + 28
    );

    // ── GUARDAR ──
    const nombreArchivo = nombre
      ? `Presupuesto_Wina_${nombre.replace(/\s+/g, "_")}.pdf`
      : `Presupuesto_Wina.pdf`;
    doc.save(nombreArchivo);
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{estilos}</style>

      {/* ── APP PRINCIPAL ── */}
      <div className="wina-page">

        {/* HEADER */}
        <header style={{ background: "white", textAlign: "center", padding: "28px 20px 22px", borderBottom: "1px solid #E8E2D9" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <Image src="/logo.png" alt="Wina Eventos" width={200} height={200} priority style={{ objectFit: "contain" }} />
          </div>
          <p style={{ fontSize: 14, color: "#6B6560", letterSpacing: "0.03em" }}>
            Alquiler de Vajilla · Cristalería · Mantelería · Picadas
          </p>
        </header>

        {/* ── QUIÉNES SOMOS — flota sobre el fondo marfil, sin caja propia ── */}
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "44px 24px 36px", textAlign: "center" }}>
          <h2 className="wina-serif" style={{ fontSize: 30, fontWeight: 600, color: "#1A1A2E", marginBottom: 6 }}>
            Quiénes somos
          </h2>
          <div style={{ width: 34, height: 2, background: "#9B7653", margin: "0 auto 22px" }} />
          <p style={{ color: "#6B6560", lineHeight: 1.8, fontSize: 15, marginBottom: 14 }}>
            En Wina Eventos nos adaptamos al tamaño de tu celebración. Te ofrecemos soluciones
            completas en alquiler de vajilla, mantelería y exquisitas tablas gourmet para que tu
            mesa luzca impecable.
          </p>
          <p style={{ color: "#6B6560", lineHeight: 1.8, fontSize: 15, marginBottom: 28 }}>
            Desde reuniones exclusivas hasta grandes festejos, nos ocupamos de cada detalle
            logístico para que vos solo te concentres en disfrutar.
          </p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E", marginBottom: 18 }}>
            📍 La Plata, City Bell y alrededores
          </p>
          <a
            href="https://instagram.com/winaeventos"
            target="_blank"
            rel="noopener noreferrer"
            className="wina-ig-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            @winaeventos
          </a>
        </div>

        {/* TABS DE CATEGORÍAS */}
        <div className="wina-tabbar">
          <button
            className={`wina-tab ${catActiva === "Datos personales" ? "activo" : ""}`}
            onClick={() => scrollToCategoria("Datos personales")}
          >
            Datos personales
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.nombre}
              className={`wina-tab ${catActiva === cat.nombre ? "activo" : ""}`}
              onClick={() => scrollToCategoria(cat.nombre)}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* PRODUCTOS */}
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 14px 140px" }}>

          {/* ── PRIMERA SECCIÓN: Datos personales ── */}
          <section
            id="cat-Datos personales"
            data-cat="Datos personales"
            style={{ marginBottom: 48, scrollMarginTop: 56 }}
          >
            <h2 className="wina-serif" style={{ fontSize: 32, fontWeight: 600, color: "#1A1A2E", marginBottom: 5 }}>
              Datos personales
            </h2>
            <div style={{ width: 34, height: 2, background: "#9B7653", marginBottom: 18 }} />
            <div style={{ background: "white", borderRadius: 15, padding: "22px", border: "1.5px solid #E8E2D9" }}>
              <div className="wina-formgrid">
                <input className="wina-input" type="text" placeholder="Nombre y Apellido" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input className="wina-input" type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <input className="wina-input" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                <input className="wina-input" type="number" placeholder="Cantidad de invitados" value={invitados} onChange={(e) => setInvitados(e.target.value)} />
              </div>
            </div>
          </section>

          {categorias.map((cat) => (
            <section
              key={cat.nombre}
              id={`cat-${cat.nombre}`}
              data-cat={cat.nombre}
              style={{ marginBottom: 48, scrollMarginTop: 56 }}
            >
              <h2 className="wina-serif" style={{ fontSize: 32, fontWeight: 600, color: "#1A1A2E", marginBottom: 5 }}>
                {cat.nombre}
              </h2>
              <div style={{ width: 34, height: 2, background: "#9B7653", marginBottom: 18 }} />

              <div className="wina-grid">
                {cat.productos.map((producto) => {
                  const qty = cantidades[producto.id];
                  return (
                    <div key={producto.id} className={`wina-card ${qty > 0 ? "seleccionado" : ""}`}>
                      <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.45, marginBottom: 13, flexGrow: 1, minHeight: 38 }}>
                        {producto.nombre}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13, marginBottom: 11 }}>
                        <button className="wina-qtybtn" onClick={() => modificarCantidad(producto.id, -1)}>−</button>
                        <input
                          className="wina-qtyinput"
                          type="number"
                          min="0"
                          value={qty}
                          onChange={(e) =>
                            setCantidades((prev) => ({
                              ...prev,
                              [producto.id]: Math.max(0, Number(e.target.value) || 0),
                            }))
                          }
                        />
                        <button className="wina-qtybtn" onClick={() => modificarCantidad(producto.id, 1)}>+</button>
                      </div>
                      <div style={{ borderTop: "1px solid #F0EBE4", paddingTop: 9 }}>
                        <p style={{ fontSize: 12, color: "#6B6560", textAlign: "center" }}>
                          ${producto.precio.toLocaleString("es-AR")} por unidad
                        </p>
                        {qty > 0 && (
                          <p style={{ fontSize: 14.5, fontWeight: 700, color: "#9B7653", textAlign: "center", marginTop: 3 }}>
                            ${(producto.precio * qty).toLocaleString("es-AR")}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* BARRA INFERIOR FIJA */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 18px", zIndex: 100, boxShadow: "0 -2px 22px rgba(0,0,0,0.2)" }}>
          <div>
            <p style={{ fontSize: 11, color: "#7A8290", marginBottom: 1 }}>Total estimado</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: "white", lineHeight: 1.1 }}>
              ${total.toLocaleString("es-AR")}
            </p>
            {itemsSeleccionados > 0 && (
              <p style={{ fontSize: 11, color: "#5A6470", marginTop: 2 }}>
                {itemsSeleccionados} artículo{itemsSeleccionados !== 1 ? "s" : ""} seleccionado{itemsSeleccionados !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            className="wina-presbtn"
            onClick={() => setVerPresupuesto(true)}
            disabled={itemsSeleccionados === 0}
            style={{ opacity: itemsSeleccionados === 0 ? 0.45 : 1, cursor: itemsSeleccionados === 0 ? "not-allowed" : "pointer" }}
          >
            Ver presupuesto →
          </button>
        </div>

      </div>

      {/* ── MODAL DE PRESUPUESTO ── */}
      {verPresupuesto && (
        <div className="wina-overlay" onClick={() => setVerPresupuesto(false)}>
          <div className="wina-modal" onClick={(e) => e.stopPropagation()}>

            {/* Encabezado del modal */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div>
                <h2 className="wina-serif" style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>Presupuesto</h2>
                <p style={{ fontSize: 12, color: "#6B6560", marginTop: 3 }}>Válido hasta el {validoHastaStr}</p>
              </div>
              <button
                onClick={() => setVerPresupuesto(false)}
                style={{ background: "#F8F5F0", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", color: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ×
              </button>
            </div>

            {/* Datos del cliente (si los completó) */}
            {(nombre || telefono || fecha || invitados) && (
              <div style={{ background: "#F8F5F0", borderRadius: 12, padding: "14px 16px", marginBottom: 20, fontSize: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#9B7653", marginBottom: 10 }}>DATOS DEL EVENTO</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
                  {nombre && <p style={{ margin: 0 }}><strong>Nombre:</strong> {nombre}</p>}
                  {telefono && <p style={{ margin: 0 }}><strong>Teléfono:</strong> {telefono}</p>}
                  {fecha && <p style={{ margin: 0 }}><strong>Fecha:</strong> {fecha}</p>}
                  {invitados && <p style={{ margin: 0 }}><strong>Invitados:</strong> {invitados}</p>}
                </div>
              </div>
            )}

            {/* Detalle de productos */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#9B7653", marginBottom: 14 }}>DETALLE</p>
              {resumenProductos.map((cat) => (
                <div key={cat.nombre} style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", color: "#1A1A2E", borderBottom: "1px solid #E8E2D9", paddingBottom: 6, marginBottom: 8 }}>
                    {cat.nombre.toUpperCase()}
                  </p>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}>
                      <span>{item.nombre} × {item.qty}</span>
                      <span style={{ fontWeight: 600, color: "#9B7653" }}>${item.subtotal.toLocaleString("es-AR")}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{ borderTop: "2px solid #1A1A2E", paddingTop: 16, marginBottom: 22, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>TOTAL ESTIMADO</span>
              <span style={{ fontSize: 26, fontWeight: 700 }}>${total.toLocaleString("es-AR")}</span>
            </div>

            {/* Nota inflación */}
            <p style={{ fontSize: 12, color: "#6B6560", lineHeight: 1.6, marginBottom: 22, padding: "12px 14px", background: "#F8F5F0", borderRadius: 10 }}>
              ⚠️ Precios orientativos vigentes al {hoy}. Para eventos con fecha posterior a los 30 días, los valores se confirmarán al momento de la reserva.
            </p>

            {/* Acciones */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="wina-btn-pdf" onClick={handlePrint}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Guardar como PDF
              </button>
              <button className="wina-btn-wa" onClick={enviarWhatsApp}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Enviar por WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}