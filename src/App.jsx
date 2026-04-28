import { useState, useEffect, createContext, useContext } from "react";
import * as DB from "./supabase.js";

// ─── USUARIOS ─────────────────────────────────────────────────────────────────
const USERS_INIT = {
  "vmbenoit636": { password:"636PBfer", grado:"Maestro", cargo:"Venerable Maestro", oficialidad:"Venerable Maestro", esVM:true, perfil:{ nombre:"Fernando", apellido:"Cruz", email:"cruzfernando0710@gmail.com", telefono:"11-3914-1232", celular:"15-3914-1232", direccion:"Alvarado 602", localidad:"Merlo", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"98.107" }},
  "prueba": { password:"prueba", grado:"Aprendiz", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Usuario", apellido:"Prueba", email:"", telefono:"", celular:"", direccion:"", localidad:"Merlo", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"000.000" }},
  "jvillegas": { password:"vill186", grado:"Maestro", cargo:"Primer Vigilante", oficialidad:"Primer Vigilante", esVM:false, perfil:{ nombre:"Jorge Oscar", apellido:"Villegas", email:"jorgevillegas@net-c.com", telefono:"4483-1426", celular:"15-5347-7947", direccion:"B. Irigoyen 7", localidad:"Castelar", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"97.186" }},
  "caraujo": { password:"arau083", grado:"Maestro", cargo:"Segundo Vigilante", oficialidad:"Segundo Vigilante", esVM:false, perfil:{ nombre:"Celso Rubén", apellido:"Araujo", email:"celsofilo@gmail.com", telefono:"01167342223", celular:"1167342223", direccion:"Tonelero 726", localidad:"Mariano Acosta", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"105.083" }},
  "mguerrero": { password:"guer752", grado:"Maestro", cargo:"Orador", oficialidad:"Orador", esVM:false, perfil:{ nombre:"Maximiliano Daniel", apellido:"Guerrero", email:"maxi_dgar@yahoo.com.ar", telefono:"02323-497-486", celular:"011-6324-0566", direccion:"Mariano Moreno 693 Dpto 7", localidad:"Luján", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"91.752" }},
  "egonzalez": { password:"gonz935", grado:"Maestro", cargo:"Secretario", oficialidad:"Secretario", esVM:false, perfil:{ nombre:"Elbio Gustavo", apellido:"González", email:"ElbioGustavogonzalez@gmail.com", telefono:"", celular:"1169001577", direccion:"Juan Manuel de Rosas 1234", localidad:"Merlo", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"106.935" }},
  "marias": { password:"aria980", grado:"Maestro", cargo:"Tesorero", oficialidad:"Tesorero", esVM:false, perfil:{ nombre:"Martín Alejandro", apellido:"Arias", email:"arias.martin.ale@gmail.com", telefono:"", celular:"1162757625", direccion:"Padilla 1468", localidad:"Libertad", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"104.980" }},
  "mrobles": { password:"robl969", grado:"Maestro", cargo:"Hospitalario", oficialidad:"Hospitalario", esVM:false, perfil:{ nombre:"Martín", apellido:"Robles", email:"martin_robles@hotmail.com", telefono:"", celular:"1161058040", direccion:"Chacabuco 715", localidad:"Merlo", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"105.969" }},
  "fbonanati": { password:"bona506", grado:"Aprendiz", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Federico Roberto", apellido:"Bonanati Rodriguez Lima", email:"frrodriguezlima@gmail.com", telefono:"", celular:"1144949631", direccion:"Latzina 1391", localidad:"Ituzaingó", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"109.506" }},
  "aclavero": { password:"clav321", grado:"Maestro", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Ángel Jorge", apellido:"Clavero", email:"claverogm@gmail.com", telefono:"4863-0823", celular:"1562203358", direccion:"Gallo 492 6° A", localidad:"CABA", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"13.321" }},
  "mfernandez": { password:"fern983", grado:"Compañero", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Mariano Ariel", apellido:"Fernández", email:"mfernandez4@gmail.com", telefono:"", celular:"1128381887", direccion:"French 950", localidad:"Merlo", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"107.983" }},
  "wfernandez": { password:"fern566", grado:"Maestro", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Walter Ariel", apellido:"Fernandez", email:"warielf@hotmail.com", telefono:"", celular:"15-4176-3921", direccion:"Arzobispo Espinosa 1483 P3", localidad:"CABA", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"92.566" }},
  "cheffler": { password:"heff239", grado:"Aprendiz", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Cristian Jesús", apellido:"Heffler", email:"cristianheffler85@gmail.com", telefono:"1126532593", celular:"1126532593", direccion:"Haedo 56", localidad:"Moreno", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"109.239" }},
  "flarranaga": { password:"larr026", grado:"Maestro", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Fernando", apellido:"Larrañaga", email:"ingflarranaga@hotmail.com", telefono:"", celular:"1168724185", direccion:"Bruno Maffi 280", localidad:"General Las Heras", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"20.026" }},
  "gpaz": { password:"paz_829", grado:"Aprendiz", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Gastón Armando", apellido:"Paz", email:"PAZGASTON2011@GMAIL.COM", telefono:"", celular:"1158456922", direccion:"Catamarca 1018", localidad:"Marcos Paz", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"110.829" }},
  "jrico": { password:"rico544", grado:"Maestro", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Jorge Omar", apellido:"Rico", email:"ajorico@hotmail.com", telefono:"0237-4625-451", celular:"011-3325-4934", direccion:"Dr. Balbi 168", localidad:"Moreno", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"91.544" }},
  "vzucco": { password:"zucc153", grado:"Maestro", cargo:"Hermano", oficialidad:"", esVM:false, perfil:{ nombre:"Vicente", apellido:"Zucco", email:"vicentezucco@hotmail.com", telefono:"02323-15-554884", celular:"02323-15-554884", direccion:"Italia 2395", localidad:"Luján", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:"", numeroDeMiembro:"99.153" }},
};

const PLANCHAS_INIT = [
  { id:1, autorKey:"vmbenoit636", titulo:"La Geometría Sagrada y el Compás", grado:"Maestro", fecha:"2024-05-10", contenido:"La geometría sagrada constituye el lenguaje universal con el que el Gran Arquitecto del Universo diseñó la creación.\n\nEl compás, herramienta del Maestro, traza los límites del conocimiento y la virtud. La geometría no es un mero recurso técnico sino el vehículo por el cual el espíritu se eleva hacia la comprensión de los principios eternos." },
  { id:2, autorKey:"jvillegas", titulo:"El Simbolismo de la Escuadra", grado:"Maestro", fecha:"2024-09-15", contenido:"La escuadra es el emblema del Primer Vigilante y el símbolo rector de la justicia y la rectitud. Cada ángulo recto que trazamos en piedra bruta es un compromiso con la verdad.\n\nSu ángulo de noventa grados no admite aproximaciones: o se es recto, o no se es." },
  { id:3, autorKey:"mfernandez", titulo:"El Sendero del Compañero", grado:"Compañero", fecha:"2025-02-20", contenido:"El segundo grado nos introduce en el estudio de las ciencias liberales y la búsqueda activa del conocimiento. El Compañero ya ha desbastado la piedra bruta y comienza a pulirla." },
  { id:4, autorKey:"cheffler", titulo:"El Umbral: Reflexión sobre la Iniciación", grado:"Aprendiz", fecha:"2025-08-05", contenido:"Al cruzar el umbral del Templo por primera vez, el profano muere simbólicamente para renacer como Aprendiz. El silencio y la oscuridad del gabinete de reflexión nos preparan para recibir la luz." },
];

const TENIDAS_INIT = [
  { id:1, fecha:"2026-04-17", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Primer viernes de Abril." },
  { id:2, fecha:"2026-05-01", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Primer viernes de Mayo." },
  { id:3, fecha:"2026-05-15", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Tercer viernes de Mayo." },
  { id:4, fecha:"2026-05-29", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Quinto viernes de Mayo." },
  { id:5, fecha:"2026-06-05", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Primer viernes de Junio." },
  { id:6, fecha:"2026-06-19", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Tercer viernes de Junio." },
  { id:7, fecha:"2026-07-03", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Primer viernes de Julio." },
  { id:8, fecha:"2026-07-17", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Tercer viernes de Julio." },
  { id:9, fecha:"2026-07-31", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Quinto viernes de Julio." },
  { id:10, fecha:"2026-08-07", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Primer viernes de Agosto." },
  { id:11, fecha:"2026-08-21", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Tercer viernes de Agosto." },
  { id:12, fecha:"2026-09-04", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Primer viernes de Septiembre." },
  { id:13, fecha:"2026-09-18", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Tercer viernes de Septiembre." },
  { id:14, fecha:"2026-10-02", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Primer viernes de Octubre." },
  { id:15, fecha:"2026-10-16", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Tercer viernes de Octubre." },
  { id:16, fecha:"2026-10-30", hora:"19:00", tipo:"Tenida de Instrucción", grado:"Aprendiz", agape:true, descripcion:"Quinto viernes de Octubre." },
];

const COMUNICADOS_INIT = [
  { id:1, fecha:"10 Abr 2026", autorKey:"vmbenoit636", titulo:"Convocatoria Tenida — Abril 2026", cuerpo:"Se convoca a todos los HH∴ en pleno ejercicio de sus derechos a la Tenida del corriente mes. La puntualidad es signo de virtud masónica." },
  { id:2, fecha:"5 Abr 2026", autorKey:"egonzalez", titulo:"Actualización de Plancha de Quites", cuerpo:"Se solicita a todos los HH∴ que completen sus datos de perfil en el sistema antes del 15 del corriente, incluyendo datos médicos y contactos de emergencia." },
  { id:3, fecha:"28 Mar 2026", autorKey:"mrobles", titulo:"Fondo de Beneficencia — 1er Trimestre", cuerpo:"Se recuerda a los HH∴ la importancia de contribuir al Fondo de Beneficencia. Las contribuciones pueden realizarse en la próxima Tenida." },
];

const ACTAS_INIT = [
  { id:1, fecha:"17 Abr 2026", tenidaDesc:"Tenida de Instrucción — 17 de Abril 2026", autorKey:"egonzalez", texto:"En la ciudad de Merlo, siendo las 19:15 horas del 17 de Abril de 2026, y reunidos en el Oriente de la Resp∴ Log∴ Pedro Benoit N∴ 636, el Ven∴ Maes∴ Fernando Cruz declaró abiertos los trabajos en grado de Aprendiz.\n\nSe procedió a la lectura del Acta de la tenida anterior, la cual fue aprobada por unanimidad. El Sec∴ Elbio González informó sobre las comunicaciones recibidas de la Gran Logia.\n\nSe realizó instrucción masónica sobre el simbolismo de la columna del Norte. El H∴ Gastón Paz presentó una breve reflexión sobre los principios fundamentales del grado de Aprendiz.\n\nNo habiendo más asuntos que tratar, el Ven∴ Maes∴ declaró cerrados los trabajos a las 21:30 horas, procediéndose al Ágape fraternal." },
];

const OFICIALIDADES = ["","Venerable Maestro","Primer Vigilante","Segundo Vigilante","Orador","Secretario","Tesorero","Limosnero","Maestro de Ceremonias","Primer Experto","Segundo Experto","Primer Diácono","Segundo Diácono","Hospitalario","Porta Espada","Porta Estandarte","Guardián Exterior","Guardián Interior","Hermano"];

// ─── TEMAS ────────────────────────────────────────────────────────────────────
const TEMAS = {
  oscuro: {
    bg:"#0d1117", bgCard:"#101d2e", bgInput:"#0a1520",
    border:"#1e3a5f", borderFuerte:"#2a5080",
    texto:"#ddeeff", textoSec:"#89afd4", textoFaint:"#3a5f80",
    acento:"#4da6ff", acentoBg:"rgba(77,166,255,0.1)", acentoBorde:"rgba(77,166,255,0.3)",
    cyan:"#56d4e0", cyanBg:"rgba(86,212,224,0.1)",
    peligro:"#ff6b6b", peligroBg:"rgba(255,107,107,0.1)", peligroBorde:"rgba(255,107,107,0.3)",
    headerBg:"rgba(10,16,26,0.97)", tabsBg:"rgba(10,16,26,0.95)",
    btnGrad:"linear-gradient(135deg,#0d2040,#153060)",
    GRADO:{ "Maestro":"#4da6ff", "Compañero":"#56d4e0", "Aprendiz":"#a78bfa" },
  },
  claro: {
    bg:"#eef2f8", bgCard:"#ffffff", bgInput:"#f4f8ff",
    border:"#c0cfe8", borderFuerte:"#8aaad4",
    texto:"#0a1a30", textoSec:"#2a4a70", textoFaint:"#7090b8",
    acento:"#1655a8", acentoBg:"rgba(22,85,168,0.08)", acentoBorde:"rgba(22,85,168,0.25)",
    cyan:"#0369a1", cyanBg:"rgba(3,105,161,0.08)",
    peligro:"#b91c1c", peligroBg:"rgba(185,28,28,0.07)", peligroBorde:"rgba(185,28,28,0.25)",
    headerBg:"rgba(238,242,248,0.98)", tabsBg:"rgba(238,242,248,0.97)",
    btnGrad:"linear-gradient(135deg,#1a3a70,#1a5098)",
    GRADO:{ "Maestro":"#1655a8", "Compañero":"#0369a1", "Aprendiz":"#6d28d9" },
  }
};

const TemaCtx = createContext(TEMAS.oscuro);
const useT = () => useContext(TemaCtx);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DIAS = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const GICON = { "Maestro":"M∴", "Compañero":"C∴", "Aprendiz":"A∴" };
const GORD = { "Aprendiz":1, "Compañero":2, "Maestro":3 };
const FF = "'Segoe UI','Helvetica Neue',Arial,sans-serif";

function canVer(ug, pg) { return GORD[ug] >= GORD[pg]; }
function puedeComun(u) {
  if (!u) return false;
  if (u.esVM) return true;
  const o = (u.oficialidad || u.cargo || "").toLowerCase();
  return o.includes("secretario") || o.includes("tesorero") || o.includes("hospitalario");
}
function nomCompleto(u) {
  const p = u?.perfil || {};
  return [(p.nombre||"").trim(), (p.apellido||"").trim()].filter(Boolean).join(" ") || "Sin nombre";
}
function fLargo(f) { if(!f) return "—"; return new Date(f+"T12:00:00").toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); }
function fCorto(f) { if(!f) return ""; return new Date(f+"T12:00:00").toLocaleDateString("es-AR",{day:"numeric",month:"short"}); }
function calcEdad(fn) { if(!fn) return null; const h=new Date(),n=new Date(fn+"T12:00:00"); let e=h.getFullYear()-n.getFullYear(); if(h.getMonth()-n.getMonth()<0||(h.getMonth()===n.getMonth()&&h.getDate()<n.getDate())) e--; return e; }

// ─── ATOMS ────────────────────────────────────────────────────────────────────
function MasonicAvatar({ grado, size }) {
  const T = useT();
  const gc = T.GRADO[grado] || T.acento;
  const sz = size || 46;
  // Masonic symbols as SVG for each degree
  const symbols = {
    "Maestro": (
      <svg viewBox="0 0 40 40" width={sz} height={sz}>
        <circle cx="20" cy="20" r="19" fill={T.acentoBg} stroke={gc} strokeWidth="2"/>
        {/* Square and compass */}
        <path d="M10 28 L10 16 L24 28" stroke={gc} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="20" y1="12" x2="13" y2="26" stroke={gc} strokeWidth="2" strokeLinecap="round"/>
        <line x1="20" y1="12" x2="27" y2="26" stroke={gc} strokeWidth="2" strokeLinecap="round"/>
        <path d="M14.5 23.5 Q20 28 25.5 23.5" stroke={gc} strokeWidth="1.5" fill="none"/>
        <text x="20" y="21" textAnchor="middle" dominantBaseline="middle" fill={gc} fontSize="7" fontFamily="serif" fontWeight="bold">G</text>
      </svg>
    ),
    "Compañero": (
      <svg viewBox="0 0 40 40" width={sz} height={sz}>
        <circle cx="20" cy="20" r="19" fill={T.acentoBg} stroke={gc} strokeWidth="2"/>
        {/* Plumb and level */}
        <line x1="20" y1="10" x2="20" y2="30" stroke={gc} strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="24" x2="28" y2="24" stroke={gc} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="30" r="2" fill={gc}/>
        <text x="20" y="18" textAnchor="middle" dominantBaseline="middle" fill={gc} fontSize="6" fontFamily="serif">C∴</text>
      </svg>
    ),
    "Aprendiz": (
      <svg viewBox="0 0 40 40" width={sz} height={sz}>
        <circle cx="20" cy="20" r="19" fill={T.acentoBg} stroke={gc} strokeWidth="2"/>
        {/* Rough ashlar / trowel */}
        <rect x="13" y="14" width="14" height="12" rx="2" stroke={gc} strokeWidth="2" fill="none"/>
        <line x1="20" y1="26" x2="20" y2="30" stroke={gc} strokeWidth="2" strokeLinecap="round"/>
        <text x="20" y="20" textAnchor="middle" dominantBaseline="middle" fill={gc} fontSize="6" fontFamily="serif">A∴</text>
      </svg>
    ),
  };
  return symbols[grado] || symbols["Aprendiz"];
}

function EyeIcon({ size, color }) {
  const T = useT(); const c = color || T.acento; const w = (size||40)*1.65; const h = size||40;
  return (
    <svg viewBox="0 0 100 60" width={w} height={h} fill="none">
      <ellipse cx="50" cy="30" rx="48" ry="27" stroke={c} strokeWidth="2.5"/>
      <circle cx="50" cy="30" r="13" stroke={c} strokeWidth="2"/>
      <circle cx="50" cy="30" r="5" fill={c}/>
      <line x1="50" y1="3" x2="50" y2="12" stroke={c} strokeWidth="2" opacity="0.6"/>
      {[0,60,120,180,240,300].map((a,i) => (
        <line key={i} x1={50+44*Math.cos(a*Math.PI/180)} y1={30+25*Math.sin(a*Math.PI/180)}
          x2={50+50*Math.cos(a*Math.PI/180)} y2={30+31*Math.sin(a*Math.PI/180)}
          stroke={c} strokeWidth="1.5" opacity="0.3"/>
      ))}
    </svg>
  );
}

function SecTitulo({ children }) {
  const T = useT();
  return (
    <div style={{marginBottom:20}}>
      <div style={{fontSize:13,fontWeight:700,letterSpacing:"0.18em",color:T.textoSec,textTransform:"uppercase",marginBottom:6}}>{children}</div>
      <div style={{width:36,height:3,background:T.acento,borderRadius:2}}/>
    </div>
  );
}

function Boton({ onClick, children, variante, chico, completo, estilo }) {
  const T = useT(); const [hover, setHover] = useState(false); const v = variante || "primario";
  const base = { padding:chico?"8px 18px":"11px 24px", borderRadius:8, cursor:"pointer", fontFamily:FF, fontSize:chico?14:15, fontWeight:700, border:"2px solid", transition:"all 0.18s", width:completo?"100%":"auto", letterSpacing:"0.04em", ...(estilo||{}) };
  if (v==="primario") return <button onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{...base, background:hover?T.acento+"40":T.acentoBg, borderColor:T.acento, color:T.acento}}>{children}</button>;
  if (v==="fantasma") return <button onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{...base, background:hover?T.texto+"10":"transparent", borderColor:hover?T.borderFuerte:T.border, color:hover?T.texto:T.textoSec}}>{children}</button>;
  return <button onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{...base, background:hover?T.peligroBg:"transparent", borderColor:hover?T.peligro:T.border, color:hover?T.peligro:T.textoSec}}>{children}</button>;
}

function Campo({ label, value, onChange, type, placeholder, readOnly }) {
  const T = useT(); const [foco, setFoco] = useState(false); const ro = readOnly||false;
  return (
    <label style={{display:"block",marginBottom:16}}>
      {label && <div style={{fontSize:14,fontWeight:600,color:ro?T.textoFaint:T.textoSec,marginBottom:6}}>{label}</div>}
      <input type={type||"text"} value={value||""} placeholder={placeholder||""} readOnly={ro}
        onChange={e => { if(!ro && onChange) onChange(e.target.value); }}
        style={{width:"100%",padding:"12px 14px",background:ro?T.bg:T.bgInput, border:`2px solid ${foco&&!ro?T.acento:ro?T.textoFaint:T.border}`, borderRadius:8, color:ro?T.textoSec:T.texto, fontSize:16, fontFamily:FF, outline:"none", boxShadow:foco&&!ro?`0 0 0 3px ${T.acento}20`:"none", transition:"all 0.2s", boxSizing:"border-box"}}
        onFocus={()=>setFoco(true)} onBlur={()=>setFoco(false)}/>
    </label>
  );
}

function Selector({ label, value, onChange, options, readOnly }) {
  const T = useT(); const ro = readOnly||false;
  return (
    <label style={{display:"block",marginBottom:16}}>
      {label && <div style={{fontSize:14,fontWeight:600,color:ro?T.textoFaint:T.textoSec,marginBottom:6}}>{label}</div>}
      <select value={value||""} disabled={ro} onChange={e => { if(!ro && onChange) onChange(e.target.value); }}
        style={{width:"100%",padding:"12px 14px",background:ro?T.bg:T.bgInput, border:`2px solid ${ro?T.textoFaint:T.border}`, borderRadius:8, color:ro?T.textoSec:T.texto, fontSize:16, fontFamily:FF, outline:"none", boxSizing:"border-box"}}>
        {(options||[]).map(o => typeof o==="string" ? <option key={o} value={o}>{o}</option> : <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </label>
  );
}

function Etiqueta({ children, color }) {
  const T = useT(); const c = color||T.acento;
  return <span style={{fontSize:13,fontWeight:700,color:c,border:`1.5px solid ${c}55`,background:`${c}15`,padding:"3px 12px",borderRadius:20}}>{children}</span>;
}

function FilaDato({ label, value, peligro }) {
  const T = useT();
  return (
    <div style={{display:"flex",padding:"12px 0",borderBottom:`1px solid ${T.border}`}}>
      <div style={{width:200,fontSize:14,fontWeight:600,color:T.textoSec,flexShrink:0}}>{label}</div>
      <div style={{flex:1,fontSize:16,color:peligro?T.peligro:T.texto}}>{value||"—"}</div>
    </div>
  );
}

function Tarjeta({ children, estilo }) {
  const T = useT();
  return <div style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderRadius:12,padding:"22px 26px",...(estilo||{})}}>{children}</div>;
}

function Notif({ msg, cerrar }) {
  const T = useT();
  useEffect(() => { const x = setTimeout(cerrar, 2800); return () => clearTimeout(x); }, []);
  return <div style={{position:"fixed",top:20,right:20,zIndex:9999,background:T.bgCard,border:`2px solid ${T.acento}`,color:T.acento,padding:"14px 24px",borderRadius:10,fontSize:16,fontWeight:700,fontFamily:FF,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",animation:"pbFI 0.3s ease"}}>{msg}</div>;
}

function BtnConfirmar({ activo, onClick, label, labelActivo, secundario, peligro }) {
  const T = useT(); const [hover, setHover] = useState(false);
  const c = peligro ? T.peligro : secundario ? T.cyan : T.acento;
  return <button onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{padding:"10px 20px",background:activo?`${c}22`:hover?`${c}0d`:"transparent",border:`2px solid ${activo?c:hover?`${c}88`:T.border}`,borderRadius:8,color:activo?c:hover?c:T.textoSec,fontSize:15,fontWeight:700,fontFamily:FF,cursor:"pointer",transition:"all 0.18s"}}>{activo?labelActivo:label}</button>;
}

function Dos({ children }) { return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>{children}</div>; }

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [oscuro, setOscuro] = useState(true);
  const T = oscuro ? TEMAS.oscuro : TEMAS.claro;
  const [pantalla, setPantalla] = useState("login");
  const [cu, setCu] = useState(null);
  const [usuarios, setUsuarios] = useState(USERS_INIT);
  const [planchas, setPlanchas] = useState(PLANCHAS_INIT);
  const [tenidas, setTenidas] = useState(TENIDAS_INIT);
  const [comunicados, setComunicados] = useState(COMUNICADOS_INIT);
  const [actas, setActas] = useState(ACTAS_INIT);
  const [confs, setConfs] = useState({});
  const [tab, setTab] = useState("inicio");
  const [notif, setNotif] = useState(null);
  const [lu, setLu] = useState(""); const [lp, setLp] = useState(""); const [lerr, setLerr] = useState("");
  const [cargando, setCargando] = useState(true);
  const [dbOk, setDbOk] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [u, t, c, a, p, cf] = await Promise.all([
          DB.getUsuarios(), DB.getTenidas(), DB.getComunicados(),
          DB.getActas(), DB.getPlanchas(), DB.getConfirmaciones()
        ]);
        if (Object.keys(u).length) setUsuarios(u);
        if (t.length) setTenidas(t);
        if (c.length) setComunicados(c);
        setActas(a); setPlanchas(p); setConfs(cf);
        setDbOk(true);
      } catch(e) {
        console.warn("Supabase no disponible:", e.message);
      } finally { setCargando(false); }
    })();
  }, []);
  function ingresar() {
    const k = lu.trim().toLowerCase();
    const u = usuarios[k];
    if (u && u.password === lp) { setCu({...u, key:k}); setPantalla("app"); setLerr(""); setTab("inicio"); }
    else setLerr("Usuario o contraseña incorrectos.");
  }
  function salir() { setPantalla("login"); setCu(null); setLu(""); setLp(""); }
  function msg(m) { setNotif(m); }

  function toggleConf(tid, tipo) {
    setConfs(prev => {
      const td = prev[tid] || {};
      const uc = td[cu.key] || {};
      let nu;
      if (tipo === "noAsiste") {
        const nv = uc.asistencia === false ? undefined : false;
        nu = {...uc, asistencia: nv};
        if (nv === undefined) delete nu.asistencia;
        msg(nv === false ? "No asisto marcado" : "Cancelado");
      } else {
        const nv = !uc[tipo];
        nu = {...uc, [tipo]: nv};
        msg(nv ? "Confirmado" : "Cancelado");
      }
      if (dbOk) DB.upsertConfirmacion(tid, cu.key, nu).catch(console.error);
      return {...prev, [tid]: {...td, [cu.key]: nu}};
    });
  }
  function miConf(tid) { return (confs[tid]||{})[cu?.key] || {}; }

  function actualizarPerfil(key, perfil) {
    const updated = {...(usuarios[key]||{}), perfil};
    setUsuarios(p => ({...p, [key]: updated}));
    if (cu?.key === key) setCu(p => ({...p, perfil}));
    if (dbOk) DB.upsertUsuario(key, updated).catch(console.error);
    msg("✓ Perfil actualizado");
  }
  function actualizarMasonico(key, cambios) {
    const updated = {...(usuarios[key]||{}), ...cambios};
    setUsuarios(p => ({...p, [key]: updated}));
    if (cu?.key === key) setCu(p => ({...p, ...cambios}));
    if (dbOk) DB.upsertUsuario(key, updated).catch(console.error);
    msg("✓ Datos actualizados");
  }
  function agregarMiembro(key, datos) {
    setUsuarios(p => ({...p, [key]: datos}));
    if (dbOk) DB.upsertUsuario(key, datos).catch(console.error);
    msg("✓ Hermano registrado");
  }
  function eliminarMiembro(key) {
    setUsuarios(p => { const n = {...p}; delete n[key]; return n; });
    if (dbOk) DB.deleteUsuario(key).catch(console.error);
    msg("Miembro eliminado");
  }
  async function agregarPlancha(p) {
    const fecha = new Date().toISOString().slice(0,10);
    if (dbOk) {
      try {
        const r = await DB.insertPlancha({...p, fecha});
        setPlanchas(prev => [...prev, r]);
        msg("✓ Plancha publicada"); return;
      } catch(e) { console.error(e); }
    }
    const id = Math.max(...planchas.map(x=>x.id), 0) + 1;
    setPlanchas(prev => [...prev, {...p, id, fecha}]);
    msg("✓ Plancha publicada");
  }
  function eliminarPlancha(id) {
    setPlanchas(p => p.filter(x => x.id !== id));
    if (dbOk) DB.deletePlancha(id).catch(console.error);
    msg("Plancha eliminada");
  }
  async function agregarActa(a) {
    const fecha = new Date().toLocaleDateString("es-AR", {day:"numeric",month:"short",year:"numeric"});
    if (dbOk) {
      try {
        const r = await DB.insertActa({...a, fecha});
        setActas(p => [r, ...p]);
        msg("✓ Acta publicada"); return;
      } catch(e) { console.error(e); }
    }
    const id = Math.max(...actas.map(x=>x.id), 0) + 1;
    setActas(p => [{...a, id, fecha}, ...p]);
    msg("✓ Acta publicada");
  }
  function eliminarActa(id) {
    setActas(p => p.filter(a => a.id !== id));
    if (dbOk) DB.deleteActa(id).catch(console.error);
    msg("Acta eliminada");
  }
  async function agregarComunicado(c) {
    const fecha = new Date().toLocaleDateString("es-AR", {day:"numeric",month:"short",year:"numeric"});
    if (dbOk) {
      try {
        const r = await DB.insertComunicado({...c, fecha});
        setComunicados(p => [r, ...p]);
        msg("✓ Comunicado publicado"); return;
      } catch(e) { console.error(e); }
    }
    const id = Math.max(...comunicados.map(x=>x.id), 0) + 1;
    setComunicados(p => [{...c, id, fecha}, ...p]);
    msg("✓ Comunicado publicado");
  }
  function eliminarComunicado(id) {
    setComunicados(p => p.filter(c => c.id !== id));
    if (dbOk) DB.deleteComunicado(id).catch(console.error);
    msg("Comunicado eliminado");
  }
  const esVM = cu?.esVM;
  const TABS = [
    {id:"inicio",label:"Inicio"}, {id:"tenidas",label:"Tenidas"},
    {id:"planchas",label:"Planchas"}, {id:"hermanos",label:"Hermanos"},
    {id:"perfil",label:"Mi Perfil"}, {id:"comunicados",label:"Comunicados"},
    ...(esVM ? [{id:"vm",label:"Panel VM ✦"}] : []),
  ];

  return (
    <TemaCtx.Provider value={T}>
      <div style={{minHeight:"100vh",background:T.bg,color:T.texto,fontFamily:FF,fontSize:16,lineHeight:1.6}}>
        {notif && <Notif msg={notif} cerrar={()=>setNotif(null)}/>}
        <style>{`@keyframes pbFI{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box;margin:0;padding:0}input::placeholder,textarea::placeholder{opacity:0.4}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}`}</style>

        {cargando && (
          <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,background:T.bg}}>
            <div style={{fontSize:38,color:T.acento}}>✦</div>
            <div style={{fontSize:16,color:T.textoSec,fontWeight:600,fontFamily:"'Segoe UI',Arial,sans-serif"}}>Cargando datos del Oriente...</div>
            <div style={{fontSize:13,color:T.textoFaint,fontFamily:"'Segoe UI',Arial,sans-serif"}}>R∴L∴ Pedro Benoit N∴ 636 · Merlo</div>
          </div>
        )}
        {!cargando && pantalla==="login" && (
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
            <div style={{textAlign:"center",marginBottom:36}}>
              <EyeIcon size={44}/>
              <div style={{fontSize:14,fontWeight:700,letterSpacing:"0.35em",color:T.acento,textTransform:"uppercase",marginTop:18,marginBottom:8}}>Resp∴ Log∴</div>
              <h1 style={{fontSize:32,fontWeight:800,color:T.texto,margin:"0 0 4px"}}>R∴L∴ Pedro Benoit</h1>
              <div style={{fontSize:20,color:T.acento,fontWeight:700,letterSpacing:"0.2em"}}>N∴ 636</div>
              <div style={{fontSize:15,color:T.textoSec,marginTop:6}}>Merlo · Buenos Aires</div>
              <div style={{width:80,height:3,background:T.acento,margin:"16px auto 0",borderRadius:2}}/>
            </div>
            <div style={{background:T.bgCard,border:`2px solid ${T.borderFuerte}`,borderRadius:16,padding:"40px 44px",width:"100%",maxWidth:420,boxShadow:oscuro?"0 20px 60px rgba(0,0,0,0.5)":"0 8px 40px rgba(22,85,168,0.12)"}}>
              <div style={{textAlign:"center",marginBottom:28,fontSize:22,color:T.acento}}>✦ &nbsp; ✦ &nbsp; ✦</div>
              <label style={{display:"block",marginBottom:18}}>
                <div style={{fontSize:14,fontWeight:700,color:T.textoSec,marginBottom:8,letterSpacing:"0.06em"}}>USUARIO</div>
                <input type="text" value={lu} onChange={e=>setLu(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ingresar()} placeholder="nombre de usuario"
                  style={{width:"100%",padding:"13px 16px",background:T.bgInput,border:`2px solid ${T.border}`,borderRadius:8,color:T.texto,fontSize:17,fontFamily:FF,outline:"none",boxSizing:"border-box"}}
                  onFocus={e=>{e.target.style.borderColor=T.acento;e.target.style.boxShadow=`0 0 0 3px ${T.acento}25`;}}
                  onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}/>
              </label>
              <label style={{display:"block",marginBottom:20}}>
                <div style={{fontSize:14,fontWeight:700,color:T.textoSec,marginBottom:8,letterSpacing:"0.06em"}}>CONTRASEÑA</div>
                <input type="password" value={lp} onChange={e=>setLp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ingresar()} placeholder="••••••••"
                  style={{width:"100%",padding:"13px 16px",background:T.bgInput,border:`2px solid ${T.border}`,borderRadius:8,color:T.texto,fontSize:17,fontFamily:FF,outline:"none",boxSizing:"border-box"}}
                  onFocus={e=>{e.target.style.borderColor=T.acento;e.target.style.boxShadow=`0 0 0 3px ${T.acento}25`;}}
                  onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}/>
              </label>
              {lerr && <div style={{color:T.peligro,fontSize:15,textAlign:"center",marginBottom:16,padding:"10px",border:`1.5px solid ${T.peligro}55`,background:T.peligroBg,borderRadius:8,fontWeight:600}}>{lerr}</div>}
              <button onClick={ingresar} style={{width:"100%",padding:"15px",background:T.btnGrad,border:`2px solid ${T.acento}`,borderRadius:10,color:T.acento,fontSize:16,letterSpacing:"0.18em",textTransform:"uppercase",cursor:"pointer",fontFamily:FF,fontWeight:800}}
                onMouseEnter={e=>e.target.style.opacity="0.88"} onMouseLeave={e=>e.target.style.opacity="1"}>
                Entrar al Templo
              </button>
              <div style={{textAlign:"center",marginTop:18}}>
                <button onClick={()=>setOscuro(d=>!d)} style={{background:"none",border:`1.5px solid ${T.border}`,borderRadius:20,padding:"7px 18px",color:T.textoSec,fontSize:14,fontWeight:600,fontFamily:FF,cursor:"pointer"}}>
                  {oscuro ? "☀  Modo Claro" : "☽  Modo Oscuro"}
                </button>
              </div>
            </div>
            <div style={{marginTop:28,fontSize:14,color:T.textoFaint,letterSpacing:"0.2em"}}>A∴ L∴ G∴ D∴ G∴ A∴ D∴ U∴</div>
          </div>
        )}

        {!cargando && pantalla==="app" && cu && (
          <div>
            <header style={{background:T.headerBg,borderBottom:`1.5px solid ${T.border}`,padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200,backdropFilter:"blur(12px)"}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <EyeIcon size={30}/>
                <div>
                  <div style={{fontSize:17,fontWeight:800,color:T.texto}}>R∴L∴ Pedro Benoit</div>
                  <div style={{fontSize:13,color:T.acento,fontWeight:600}}>N∴ 636 · Merlo, Buenos Aires</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <button onClick={()=>setOscuro(d=>!d)} title="Cambiar tema" style={{background:T.acentoBg,border:`1.5px solid ${T.acentoBorde}`,borderRadius:20,padding:"6px 14px",color:T.acento,fontSize:16,fontWeight:700,fontFamily:FF,cursor:"pointer"}}>{oscuro?"☀":"☽"}</button>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:15,color:T.texto,fontWeight:700}}>{nomCompleto(cu)}</div>
                  <div style={{fontSize:13,color:T.GRADO[cu.grado]||T.acento,fontWeight:700}}>{cu.grado[0]}∴ {cu.oficialidad||cu.cargo}</div>
                </div>
                <Boton onClick={salir} variante="fantasma" chico>Salir</Boton>
              </div>
            </header>

            <div style={{background:T.tabsBg,borderBottom:`1.5px solid ${T.border}`,padding:"0 24px",display:"flex",overflowX:"auto"}}>
              {TABS.map(x => (
                <button key={x.id} onClick={()=>setTab(x.id)} style={{padding:"14px 18px",background:"none",border:"none",borderBottom:`3px solid ${tab===x.id?T.acento:"transparent"}`,color:tab===x.id?T.acento:T.textoSec,cursor:"pointer",fontFamily:FF,fontSize:15,fontWeight:tab===x.id?700:500,whiteSpace:"nowrap",transition:"all 0.2s"}}>{x.label}</button>
              ))}
            </div>

            <div style={{maxWidth:920,margin:"0 auto",padding:"32px 24px 64px"}}>
              {tab==="inicio" && <TabCalendario tenidas={tenidas} confs={confs} toggleConf={toggleConf} miConf={miConf} actas={actas} cu={cu} onAgregarActa={agregarActa} onEliminarActa={eliminarActa}/>}
              {tab==="tenidas" && <TabTenidas tenidas={tenidas} confs={confs} toggleConf={toggleConf} miConf={miConf}/>}
              {tab==="planchas" && <TabPlanchas planchas={planchas} usuarios={usuarios} cu={cu} onAgregar={agregarPlancha} onEliminar={eliminarPlancha} esVM={esVM}/>}
              {tab==="hermanos" && <TabHermanos usuarios={usuarios} cu={cu}/>}
              {tab==="perfil" && <TabPerfil datosUser={usuarios[cu.key]} onGuardar={p=>actualizarPerfil(cu.key,p)}/>}
              {tab==="comunicados" && <TabComunicados comunicados={comunicados} cu={cu} usuarios={usuarios} onAgregar={agregarComunicado} onEliminar={eliminarComunicado}/>}
              {tab==="vm" && esVM && <TabVM tenidas={tenidas} setTenidas={setTenidas} dbOk={dbOk} usuarios={usuarios} confs={confs} planchas={planchas} msg={msg} actualizarMasonico={actualizarMasonico} agregarMiembro={agregarMiembro} eliminarMiembro={eliminarMiembro} eliminarPlancha={eliminarPlancha}/>}
            </div>
            <div style={{textAlign:"center",paddingBottom:32,fontSize:14,color:T.textoFaint,letterSpacing:"0.2em"}}>A∴ L∴ G∴ D∴ G∴ A∴ D∴ U∴</div>
          </div>
        )}
      </div>
    </TemaCtx.Provider>
  );
}

// ─── CALENDARIO ───────────────────────────────────────────────────────────────
function TabCalendario({ tenidas, confs, toggleConf, miConf, actas, cu, onAgregarActa, onEliminarActa }) {
  const T = useT();
  const hoy = new Date();
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth());

  const primerDia = new Date(anio, mes, 1).getDay();
  const diasEnMes = new Date(anio, mes+1, 0).getDate();
  const mapaTenidas = {};
  tenidas.forEach(t => { const d=new Date(t.fecha+"T12:00:00"); if(d.getFullYear()===anio&&d.getMonth()===mes) mapaTenidas[d.getDate()]=t; });
  const proxima = tenidas.filter(t=>new Date(t.fecha+"T12:00:00")>=hoy).sort((a,b)=>a.fecha.localeCompare(b.fecha))[0];
  const confProxima = proxima ? miConf(proxima.id) : {};

  const celdas = [];
  for(let i=0;i<primerDia;i++) celdas.push(null);
  for(let d=1;d<=diasEnMes;d++) celdas.push(d);

  function anteriorMes(){ if(mes===0){setMes(11);setAnio(a=>a-1);}else setMes(m=>m-1); }
  function siguienteMes(){ if(mes===11){setMes(0);setAnio(a=>a+1);}else setMes(m=>m+1); }

  return (
    <div>
      <SecTitulo>Almanaque del Oriente</SecTitulo>

      {proxima && (
        <div style={{background:T.acentoBg,border:`2px solid ${T.acentoBorde}`,borderRadius:14,padding:"22px 28px",marginBottom:28}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:"0.25em",color:T.acento,textTransform:"uppercase",marginBottom:6}}>Próxima Tenida</div>
          <div style={{fontSize:24,fontWeight:800,color:T.texto,marginBottom:4}}>{proxima.tipo}</div>
          <div style={{fontSize:15,color:T.textoSec,fontWeight:500,marginBottom:16}}>{fLargo(proxima.fecha)} · {proxima.hora} hs · Grado {proxima.grado}</div>
          <div style={{display:"flex",gap:16,marginBottom:16,flexWrap:"wrap"}}>
            <span style={{fontSize:15,fontWeight:600,color:confProxima.asistencia?T.acento:T.textoSec}}>{confProxima.asistencia?"✓ Vas a asistir":"Sin confirmar asistencia"}</span>
            {proxima.agape && <span style={{fontSize:15,fontWeight:600,color:confProxima.agape?T.cyan:T.textoFaint}}>{confProxima.agape?"✓ Ágape confirmado":"Sin confirmar ágape"}</span>}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <BtnConfirmar activo={confProxima.asistencia===true} onClick={()=>toggleConf(proxima.id,"asistencia")} label="Confirmar asistencia" labelActivo="✓ Asistencia confirmada"/>
            {proxima.agape && <BtnConfirmar activo={confProxima.agape} onClick={()=>toggleConf(proxima.id,"agape")} label="+ Confirmar ágape" labelActivo="✓ Ágape confirmado" secundario/>}
            <BtnConfirmar activo={confProxima.asistencia===false} onClick={()=>toggleConf(proxima.id,"noAsiste")} label="No asisto" labelActivo="✗ No voy" peligro/>
          </div>
        </div>
      )}

      <Tarjeta estilo={{overflow:"hidden",padding:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:`1.5px solid ${T.border}`}}>
          <button onClick={anteriorMes} style={{background:T.acentoBg,border:`1.5px solid ${T.acentoBorde}`,color:T.acento,padding:"8px 18px",borderRadius:8,cursor:"pointer",fontFamily:FF,fontSize:18,fontWeight:700}}>‹</button>
          <div style={{fontSize:20,fontWeight:700,color:T.texto}}>{MESES[mes]} <span style={{color:T.acento}}>{anio}</span></div>
          <button onClick={siguienteMes} style={{background:T.acentoBg,border:`1.5px solid ${T.acentoBorde}`,color:T.acento,padding:"8px 18px",borderRadius:8,cursor:"pointer",fontFamily:FF,fontSize:18,fontWeight:700}}>›</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:`1px solid ${T.border}`}}>
          {DIAS.map(d => <div key={d} style={{padding:"10px 0",textAlign:"center",fontSize:13,fontWeight:700,color:T.textoSec,textTransform:"uppercase"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
          {celdas.map((dia, i) => {
            const esHoy = dia && dia===hoy.getDate() && mes===hoy.getMonth() && anio===hoy.getFullYear();
            const tenida = dia ? mapaTenidas[dia] : null;
            const esProxima = tenida && proxima && tenida.id===proxima.id;
            return (
              <div key={i} style={{minHeight:68,padding:"8px",borderRight:(i+1)%7===0?"none":`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,background:esHoy?T.acentoBg:tenida?`${T.acento}08`:"none"}}>
                {dia && (
                  <>
                    <div style={{fontSize:15,fontWeight:esHoy?800:500,color:esHoy?T.acento:tenida?T.texto:T.textoSec,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:esHoy?`${T.acento}30`:"none",borderRadius:"50%"}}>{dia}</div>
                    {tenida && <div style={{marginTop:3,fontSize:11,fontWeight:700,color:esProxima?T.acento:T.textoSec,background:esProxima?`${T.acento}22`:T.acentoBg,borderRadius:4,padding:"2px 5px",borderLeft:`3px solid ${esProxima?T.acento:T.textoSec}`}}>T.Inst.</div>}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Tarjeta>

      {Object.keys(mapaTenidas).length > 0 && (
        <div style={{marginTop:22}}>
          <div style={{fontSize:14,fontWeight:700,letterSpacing:"0.15em",color:T.textoSec,textTransform:"uppercase",marginBottom:12}}>Tenidas de {MESES[mes]}</div>
          {Object.entries(mapaTenidas).sort(([a],[b])=>+a-+b).map(([dia, ten]) => {
            const conf = miConf(ten.id);
            return (
              <div key={dia} style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderLeft:`4px solid ${T.acento}`,borderRadius:10,padding:"16px 20px",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
                  <div style={{fontSize:26,fontWeight:800,color:T.acento,minWidth:36,textAlign:"center"}}>{dia}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:16,fontWeight:700,color:T.texto}}>{ten.tipo}</div>
                    <div style={{fontSize:14,color:T.textoSec,fontWeight:500}}>{ten.hora} hs · Grado {ten.grado}{ten.agape?" · Con Ágape":""}</div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    {conf.asistencia && <Etiqueta color={T.acento}>Asisto</Etiqueta>}
                    {conf.agape && <Etiqueta color={T.cyan}>Ágape</Etiqueta>}
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <BtnConfirmar activo={conf.asistencia===true} onClick={()=>toggleConf(ten.id,"asistencia")} label="Confirmar asistencia" labelActivo="✓ Voy"/>
                  {ten.agape && <BtnConfirmar activo={conf.agape} onClick={()=>toggleConf(ten.id,"agape")} label="+ Ágape" labelActivo="✓ Me quedo al ágape" secundario/>}
                  <BtnConfirmar activo={conf.asistencia===false} onClick={()=>toggleConf(ten.id,"noAsiste")} label="No asisto" labelActivo="✗ No voy" peligro/>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── ACTA DE LA TENIDA ANTERIOR ─── */}
      <div style={{marginTop:32}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
          <SecTitulo>Acta de la Tenida Anterior</SecTitulo>
          {cu && (cu.esVM || (cu.oficialidad||"").toLowerCase().includes("secretario")) && (
            <ActaForm cu={cu} onAgregar={onAgregarActa}/>
          )}
        </div>
        {actas && actas.length > 0 ? actas.slice(0,1).map(acta => (
          <ActaCard key={acta.id} acta={acta} puedeEliminar={cu && (cu.esVM||(cu.oficialidad||"").toLowerCase().includes("secretario"))} onEliminar={onEliminarActa}/>
        )) : (
          <Tarjeta estilo={{textAlign:"center",color:"var(--ts, #89afd4)",fontSize:15,padding:"32px"}}>No hay actas publicadas aún.</Tarjeta>
        )}
        {actas && actas.length > 1 && (
          <details style={{marginTop:10}}>
            <summary style={{cursor:"pointer",fontSize:14,fontWeight:600,color:"#4da6ff",padding:"8px 0",userSelect:"none"}}>Ver actas anteriores ({actas.length-1} más)</summary>
            {actas.slice(1).map(acta => (
              <ActaCard key={acta.id} acta={acta} puedeEliminar={cu && (cu.esVM||(cu.oficialidad||"").toLowerCase().includes("secretario"))} onEliminar={onEliminarActa}/>
            ))}
          </details>
        )}
      </div>
    </div>
  );
}

// ─── TENIDAS ──────────────────────────────────────────────────────────────────
function ActaCard({ acta, puedeEliminar, onEliminar }) {
  const T = useT();
  const [expandido, setExpandido] = useState(false);
  const preview = acta.texto.length > 300 ? acta.texto.slice(0,300) + "..." : acta.texto;
  return (
    <Tarjeta estilo={{marginBottom:12,borderLeft:`4px solid ${T.textoSec}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:16,fontWeight:700,color:T.texto,marginBottom:3}}>{acta.tenidaDesc}</div>
          <div style={{fontSize:13,color:T.textoSec,fontWeight:500}}>{acta.fecha}</div>
        </div>
        {puedeEliminar && (
          <button onClick={()=>onEliminar(acta.id)}
            style={{background:"none",border:`1.5px solid ${T.border}`,color:T.textoSec,padding:"4px 12px",borderRadius:6,cursor:"pointer",fontFamily:FF,fontSize:13,fontWeight:600,transition:"all 0.2s"}}
            onMouseEnter={e=>{e.target.style.borderColor=T.peligro;e.target.style.color=T.peligro;}}
            onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.textoSec;}}>
            Eliminar
          </button>
        )}
      </div>
      <p style={{fontSize:15,color:T.textoSec,lineHeight:1.8,whiteSpace:"pre-wrap"}}>
        {expandido ? acta.texto : preview}
      </p>
      {acta.texto.length > 300 && (
        <button onClick={()=>setExpandido(!expandido)}
          style={{background:"none",border:"none",color:T.acento,cursor:"pointer",fontFamily:FF,fontSize:14,fontWeight:600,marginTop:8,padding:0}}>
          {expandido ? "Mostrar menos ↑" : "Leer acta completa ↓"}
        </button>
      )}
    </Tarjeta>
  );
}

function ActaForm({ cu, onAgregar }) {
  const T = useT();
  const [mostrar, setMostrar] = useState(false);
  const [tenidaDesc, setTenidaDesc] = useState("");
  const [texto, setTexto] = useState("");
  function publicar() {
    if(!tenidaDesc.trim()||!texto.trim()) return;
    onAgregar({tenidaDesc, texto, autorKey:cu.key});
    setTenidaDesc(""); setTexto(""); setMostrar(false);
  }
  return (
    <div>
      <Boton onClick={()=>setMostrar(!mostrar)} variante={mostrar?"fantasma":"primario"} chico>
        {mostrar ? "Cancelar" : "+ Transcribir Acta"}
      </Boton>
      {mostrar && (
        <Tarjeta estilo={{marginTop:14,marginBottom:4,border:`2px solid ${T.acentoBorde}`}}>
          <div style={{fontSize:15,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:14}}>Nueva Acta</div>
          <Campo label="Descripción de la Tenida" value={tenidaDesc} onChange={setTenidaDesc} placeholder="Ej: Tenida de Instrucción — 17 de Abril 2026"/>
          <label style={{display:"block",marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:600,color:T.textoSec,marginBottom:6}}>Texto del Acta</div>
            <textarea value={texto} onChange={e=>setTexto(e.target.value)} rows={10}
              placeholder="Transcribí o pegá el acta aquí..."
              style={{width:"100%",padding:"12px 14px",background:T.bgInput,border:`2px solid ${T.border}`,borderRadius:8,color:T.texto,fontSize:15,fontFamily:FF,outline:"none",resize:"vertical",lineHeight:1.8,boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor=T.acento} onBlur={e=>e.target.style.borderColor=T.border}/>
          </label>
          <div style={{display:"flex",gap:10}}>
            <Boton onClick={publicar}>Publicar Acta</Boton>
            <Boton onClick={()=>setMostrar(false)} variante="fantasma">Cancelar</Boton>
          </div>
        </Tarjeta>
      )}
    </div>
  );
}

function TenidaCard({ tenida, pasada, conf, onToggle }) {
  const T = useT();
  return (
    <div style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderLeft:`4px solid ${pasada?T.border:T.acento}`,borderRadius:12,padding:"22px 26px",marginBottom:14,opacity:pasada?0.6:1}}>
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:12}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:T.texto,marginBottom:4}}>{tenida.tipo}</div>
          <div style={{fontSize:14,fontWeight:600,color:T.acento}}>Grado {tenida.grado} · {tenida.hora} hs</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:15,color:T.textoSec,fontWeight:500}}>{fLargo(tenida.fecha)}</div>
          {tenida.agape && <div style={{marginTop:6}}><Etiqueta color={T.cyan}>Con Ágape</Etiqueta></div>}
        </div>
      </div>
      <p style={{fontSize:15,color:T.textoSec,lineHeight:1.7,marginBottom:pasada?0:16}}>{tenida.descripcion}</p>
      {!pasada && (
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <BtnConfirmar activo={conf.asistencia===true} onClick={()=>onToggle(tenida.id,"asistencia")} label="Confirmar asistencia" labelActivo="✓ Asistencia confirmada"/>
          {tenida.agape && <BtnConfirmar activo={conf.agape} onClick={()=>onToggle(tenida.id,"agape")} label="Confirmar ágape" labelActivo="✓ Ágape confirmado" secundario/>}
          <BtnConfirmar activo={conf.asistencia===false} onClick={()=>onToggle(tenida.id,"noAsiste")} label="No asisto" labelActivo="✗ No voy" peligro/>
        </div>
      )}
    </div>
  );
}

function TabTenidas({ tenidas, confs, toggleConf, miConf }) {
  const T = useT();
  const hoy = new Date();
  const proximas = tenidas.filter(t=>new Date(t.fecha+"T12:00:00")>=hoy).sort((a,b)=>a.fecha.localeCompare(b.fecha));
  const pasadas = tenidas.filter(t=>new Date(t.fecha+"T12:00:00")<hoy).sort((a,b)=>b.fecha.localeCompare(a.fecha));
  return (
    <div>
      <SecTitulo>Próximas Tenidas</SecTitulo>
      {proximas.length===0 && <p style={{color:T.textoSec,fontSize:15}}>No hay tenidas programadas.</p>}
      {proximas.map(t => <TenidaCard key={t.id} tenida={t} conf={miConf(t.id)} onToggle={toggleConf}/>)}
      {pasadas.length>0 && (
        <div style={{marginTop:36}}>
          <SecTitulo>Tenidas Anteriores</SecTitulo>
          {pasadas.map(t => <TenidaCard key={t.id} tenida={t} pasada conf={miConf(t.id)} onToggle={toggleConf}/>)}
        </div>
      )}
    </div>
  );
}

// ─── PLANCHAS ─────────────────────────────────────────────────────────────────
function TabPlanchas({ planchas, usuarios, cu, onAgregar, onEliminar, esVM }) {
  const T = useT();
  const [seleccionada, setSeleccionada] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [grado, setGrado] = useState(cu.grado);
  const [contenido, setContenido] = useState("");
  const GP = ["Aprendiz","Compañero","Maestro"].filter(g => GORD[g]<=GORD[cu.grado]);
  const GC = { "Maestro":T.acento, "Compañero":T.cyan, "Aprendiz":"#a78bfa" };
  const visibles = planchas.filter(p => canVer(cu.grado,p.grado)).sort((a,b)=>b.fecha.localeCompare(a.fecha));

  function publicar() {
    if(!titulo.trim()||!contenido.trim()) return;
    onAgregar({titulo,grado,contenido,autorKey:cu.key});
    setTitulo(""); setContenido(""); setGrado(cu.grado); setMostrarForm(false);
  }

  if (seleccionada) {
    const autor = usuarios[seleccionada.autorKey];
    return (
      <div>
        <button onClick={()=>setSeleccionada(null)} style={{background:"none",border:"none",color:T.textoSec,cursor:"pointer",fontFamily:FF,fontSize:15,fontWeight:600,marginBottom:20,padding:0}}>← Volver</button>
        <Tarjeta>
          <div style={{fontSize:13,fontWeight:700,color:GC[seleccionada.grado]||T.acento,textTransform:"uppercase",letterSpacing:"0.2em",marginBottom:8}}>Plancha de {seleccionada.grado} · {seleccionada.fecha}</div>
          <h2 style={{fontSize:24,fontWeight:800,color:T.texto,marginBottom:8}}>{seleccionada.titulo}</h2>
          <div style={{fontSize:15,color:T.textoSec,fontWeight:500,marginBottom:22}}>{autor?nomCompleto(autor):"Hermano"}</div>
          <div style={{height:3,background:`linear-gradient(90deg,${T.acento},transparent)`,borderRadius:2,marginBottom:24}}/>
          <p style={{fontSize:17,color:T.texto,lineHeight:2,whiteSpace:"pre-wrap"}}>{seleccionada.contenido}</p>
          {(cu.key===seleccionada.autorKey||esVM) && (
            <div style={{marginTop:28,paddingTop:18,borderTop:`1.5px solid ${T.border}`}}>
              <Boton onClick={()=>{onEliminar(seleccionada.id);setSeleccionada(null);}} variante="peligro" chico>Eliminar plancha</Boton>
            </div>
          )}
        </Tarjeta>
      </div>
    );
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <SecTitulo>Biblioteca de Planchas</SecTitulo>
        <Boton onClick={()=>setMostrarForm(!mostrarForm)} variante={mostrarForm?"fantasma":"primario"} chico>{mostrarForm?"Cancelar":"+ Nueva Plancha"}</Boton>
      </div>
      <div style={{background:T.acentoBg,border:`1.5px solid ${T.acentoBorde}`,borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:15,color:T.textoSec}}>
        Acceso a planchas de: <strong style={{color:T.texto}}>{GP.join(", ")}</strong>
      </div>
      {mostrarForm && (
        <Tarjeta estilo={{marginBottom:22,border:`2px solid ${T.acentoBorde}`}}>
          <div style={{fontSize:15,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:16}}>Nueva Plancha</div>
          <Campo label="Título" value={titulo} onChange={setTitulo} placeholder="Título de la plancha"/>
          <Selector label="Grado" value={grado} onChange={setGrado} options={GP}/>
          <label style={{display:"block",marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:600,color:T.textoSec,marginBottom:6}}>Contenido</div>
            <textarea value={contenido} onChange={e=>setContenido(e.target.value)} rows={8} placeholder="Escribí el contenido..."
              style={{width:"100%",padding:"12px 14px",background:T.bgInput,border:`2px solid ${T.border}`,borderRadius:8,color:T.texto,fontSize:16,fontFamily:FF,outline:"none",resize:"vertical",lineHeight:1.8,boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor=T.acento} onBlur={e=>e.target.style.borderColor=T.border}/>
          </label>
          <div style={{display:"flex",gap:10}}>
            <Boton onClick={publicar}>Publicar Plancha</Boton>
            <Boton onClick={()=>setMostrarForm(false)} variante="fantasma">Cancelar</Boton>
          </div>
        </Tarjeta>
      )}
      {["Maestro","Compañero","Aprendiz"].filter(g=>canVer(cu.grado,g)).map(g => {
        const delGrado = visibles.filter(p=>p.grado===g);
        if(!delGrado.length) return null;
        return (
          <div key={g} style={{marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <span style={{fontSize:16,color:GC[g],fontWeight:800}}>{g==="Maestro"?"⬟":g==="Compañero"?"⬡":"○"}</span>
              <span style={{fontSize:14,fontWeight:700,color:GC[g],letterSpacing:"0.2em",textTransform:"uppercase"}}>Planchas de {g}</span>
              <div style={{flex:1,height:2,background:`linear-gradient(90deg,${GC[g]}50,transparent)`,borderRadius:2}}/>
            </div>
            {delGrado.map(p => {
              const autor = usuarios[p.autorKey];
              return (
                <div key={p.id} onClick={()=>setSeleccionada(p)} style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderLeft:`4px solid ${GC[p.grado]}`,borderRadius:10,padding:"18px 22px",marginBottom:10,cursor:"pointer"}}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 4px 20px ${T.acento}25`;}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                    <div>
                      <div style={{fontSize:17,fontWeight:700,color:T.texto,marginBottom:5}}>{p.titulo}</div>
                      <div style={{fontSize:14,color:T.textoSec,fontWeight:500}}>{autor?nomCompleto(autor):"Hermano"} · {fCorto(p.fecha)}</div>
                    </div>
                    <div style={{fontSize:15,color:T.textoSec,fontWeight:600}}>Leer →</div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {visibles.length===0 && <div style={{textAlign:"center",padding:"56px 0",color:T.textoSec,fontSize:16}}>No hay planchas disponibles para tu grado.</div>}
    </div>
  );
}

// ─── HERMANOS ─────────────────────────────────────────────────────────────────
function TabHermanos({ usuarios, cu }) {
  const T = useT();
  const [seleccionado, setSeleccionado] = useState(null);
  const lista = Object.entries(usuarios).sort(([,a],[,b]) => {
    const o = {"Maestro":1,"Compañero":2,"Aprendiz":3};
    return (o[a.grado]-o[b.grado]) || nomCompleto(a).localeCompare(nomCompleto(b));
  });

  if (seleccionado) {
    const [clave, u] = seleccionado;
    const p = u.perfil || {};
    const gc = T.GRADO[u.grado]||T.acento;
    const esMio = clave===cu.key;
    const puedeMedico = esMio || cu.esVM;
    return (
      <div>
        <button onClick={()=>setSeleccionado(null)} style={{background:"none",border:"none",color:T.textoSec,cursor:"pointer",fontFamily:FF,fontSize:15,fontWeight:600,marginBottom:20,padding:0}}>← Volver al Cuadro Lógico</button>
        <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:28,flexWrap:"wrap"}}>
          <MasonicAvatar grado={u.grado} size={68}/>
          <div>
            <div style={{fontSize:22,fontWeight:800,color:T.texto,marginBottom:4}}>{nomCompleto(u)}</div>
            <div style={{fontSize:15,color:gc,fontWeight:700}}>{u.oficialidad||u.cargo} · {u.grado}</div>
            {p.numeroDeMiembro && <div style={{fontSize:14,color:T.textoSec,marginTop:2}}>Leg. N° {p.numeroDeMiembro}</div>}
          </div>
          {esMio && <Etiqueta>Tu perfil</Etiqueta>}
        </div>
        <Tarjeta estilo={{marginBottom:14}}>
          <FilaDato label="Profesión" value={p.profesion}/>
          <FilaDato label="Localidad" value={p.localidad}/>
          <FilaDato label="Provincia" value={p.provincia}/>
          <FilaDato label="Estado Civil" value={p.estadoCivil}/>
          {p.fechaNacimiento && <FilaDato label="Edad" value={`${calcEdad(p.fechaNacimiento)} años`}/>}
          {(esMio||cu.esVM) && <FilaDato label="Email" value={p.email}/>}
          {(esMio||cu.esVM) && <FilaDato label="Celular" value={p.celular}/>}
        </Tarjeta>
        {puedeMedico && (
          <div style={{background:T.peligroBg,border:`1.5px solid ${T.peligroBorde}`,borderRadius:12,padding:"22px 26px"}}>
            <div style={{fontSize:14,fontWeight:700,color:T.peligro,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:14}}>🔒 Datos Médicos y de Emergencia</div>
            <FilaDato label="Tipo de Sangre" value={p.sangre} peligro/>
            <FilaDato label="Alergias" value={p.alergias}/>
            <FilaDato label="Enfermedades" value={p.enfermedades}/>
            <FilaDato label="Medicamentos" value={p.medicamentos}/>
            <FilaDato label="Contacto Emergencia" value={p.contactoEmergencia}/>
            <FilaDato label="Relación" value={p.relacionEmergencia}/>
            <FilaDato label="Tel. Emergencia" value={p.telefonoEmergencia}/>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <SecTitulo>Cuadro Lógico — {lista.length} Hermanos</SecTitulo>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:14}}>
        {lista.map(([k,u]) => {
          const gc = T.GRADO[u.grado]||T.acento;
          const p = u.perfil||{};
          return (
            <div key={k} onClick={()=>setSeleccionado([k,u])}
              style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderRadius:12,padding:"20px 22px",cursor:"pointer",transition:"all 0.18s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.acento;e.currentTarget.style.boxShadow=`0 4px 20px ${T.acento}25`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.boxShadow="none";}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <MasonicAvatar grado={u.grado} size={46}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:700,color:T.texto,marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{nomCompleto(u)}</div>
                  <div style={{fontSize:13,color:gc,fontWeight:600}}>{u.oficialidad||u.cargo}</div>
                  <div style={{fontSize:13,color:T.textoSec}}>{u.grado}{p.localidad?` · ${p.localidad}`:""}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PERFIL ───────────────────────────────────────────────────────────────────
function TabPerfil({ datosUser, onGuardar }) {
  const T = useT();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({...datosUser.perfil});
  const gc = T.GRADO[datosUser.grado]||T.acento;
  function set(k,v){ setForm(p=>({...p,[k]:v})); }
  function guardar(){ onGuardar(form); setEditando(false); }
  function cancelar(){ setForm({...datosUser.perfil}); setEditando(false); }

  return (
    <div>
      <SecTitulo>Mi Perfil Masónico</SecTitulo>
      <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:28,flexWrap:"wrap"}}>
        <MasonicAvatar grado={datosUser.grado} size={72}/>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:T.texto,marginBottom:4}}>{nomCompleto(datosUser)}</div>
          <div style={{fontSize:15,color:gc,fontWeight:700}}>{datosUser.oficialidad||datosUser.cargo} · {datosUser.grado}</div>
          <div style={{fontSize:14,color:T.textoSec,marginTop:2}}>Leg. N° {form.numeroDeMiembro} · R∴L∴ Pedro Benoit 636</div>
        </div>
        {!editando && <Boton onClick={()=>setEditando(true)} variante="fantasma" chico estilo={{marginLeft:"auto"}}>Editar mis datos</Boton>}
      </div>
      {!editando && <div style={{background:T.acentoBg,border:`1.5px solid ${T.acentoBorde}`,borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:15,color:T.textoSec}}>Los datos masónicos son gestionados por el Venerable Maestro.</div>}

      {editando ? (
        <div>
          <Tarjeta estilo={{marginBottom:14}}>
            <div style={{fontSize:15,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:16}}>Identidad</div>
            <Dos>
              <Campo label="Nombre" value={form.nombre} onChange={v=>set("nombre",v)}/>
              <Campo label="Apellido" value={form.apellido} onChange={v=>set("apellido",v)}/>
              <Campo label="DNI" value={form.dni} onChange={v=>set("dni",v)}/>
              <Campo label="Fecha de Nacimiento" type="date" value={form.fechaNacimiento} onChange={v=>set("fechaNacimiento",v)}/>
              <Selector label="Estado Civil" value={form.estadoCivil} onChange={v=>set("estadoCivil",v)} options={["Soltero","Casado","Divorciado","Viudo","Unión convivencial"]}/>
              <Campo label="Profesión" value={form.profesion} onChange={v=>set("profesion",v)}/>
            </Dos>
          </Tarjeta>
          <Tarjeta estilo={{marginBottom:14}}>
            <div style={{fontSize:15,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:16}}>Contacto</div>
            <Dos>
              <Campo label="Email" value={form.email} onChange={v=>set("email",v)}/>
              <Campo label="Teléfono" value={form.telefono} onChange={v=>set("telefono",v)}/>
              <Campo label="Celular" value={form.celular} onChange={v=>set("celular",v)}/>
              <div/>
            </Dos>
            <Campo label="Dirección" value={form.direccion} onChange={v=>set("direccion",v)}/>
            <Dos>
              <Campo label="Localidad" value={form.localidad} onChange={v=>set("localidad",v)}/>
              <Campo label="Provincia" value={form.provincia} onChange={v=>set("provincia",v)}/>
            </Dos>
          </Tarjeta>
          <div style={{background:T.peligroBg,border:`1.5px solid ${T.peligroBorde}`,borderRadius:12,padding:"22px 26px",marginBottom:14}}>
            <div style={{fontSize:15,fontWeight:700,color:T.peligro,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:16}}>🔒 Datos Médicos y de Emergencia</div>
            <Dos>
              <Selector label="Tipo de Sangre" value={form.sangre} onChange={v=>set("sangre",v)} options={[{v:"",l:"— seleccionar —"},"A+","A-","B+","B-","AB+","AB-","O+","O-"]}/>
              <Campo label="Alergias" value={form.alergias} onChange={v=>set("alergias",v)} placeholder="Ej: Penicilina"/>
            </Dos>
            <Campo label="Enfermedades / Condiciones crónicas" value={form.enfermedades} onChange={v=>set("enfermedades",v)}/>
            <Campo label="Medicamentos habituales" value={form.medicamentos} onChange={v=>set("medicamentos",v)}/>
            <Dos>
              <Campo label="Contacto de Emergencia" value={form.contactoEmergencia} onChange={v=>set("contactoEmergencia",v)}/>
              <Campo label="Relación" value={form.relacionEmergencia} onChange={v=>set("relacionEmergencia",v)}/>
            </Dos>
            <Campo label="Teléfono de Emergencia" value={form.telefonoEmergencia} onChange={v=>set("telefonoEmergencia",v)}/>
          </div>
          <div style={{display:"flex",gap:12}}>
            <Boton onClick={guardar}>Guardar cambios</Boton>
            <Boton onClick={cancelar} variante="fantasma">Cancelar</Boton>
          </div>
        </div>
      ) : (
        <div>
          <Tarjeta estilo={{marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:700,color:T.textoSec,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:14}}>Datos Personales</div>
            <FilaDato label="Nombre completo" value={nomCompleto(datosUser)}/><FilaDato label="DNI" value={form.dni}/><FilaDato label="Edad" value={form.fechaNacimiento?`${fCorto(form.fechaNacimiento)} (${calcEdad(form.fechaNacimiento)} años)`:null}/><FilaDato label="Estado Civil" value={form.estadoCivil}/><FilaDato label="Profesión" value={form.profesion}/>
          </Tarjeta>
          <Tarjeta estilo={{marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:700,color:T.textoSec,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:14}}>Contacto</div>
            <FilaDato label="Email" value={form.email}/><FilaDato label="Teléfono" value={form.telefono}/><FilaDato label="Celular" value={form.celular}/><FilaDato label="Dirección" value={form.direccion}/><FilaDato label="Localidad" value={form.localidad}/>
          </Tarjeta>
          <Tarjeta estilo={{marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:700,color:T.textoSec,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:14}}>Masónico (solo lectura)</div>
            <FilaDato label="Grado · Cargo" value={`${datosUser.grado} · ${datosUser.cargo}`}/><FilaDato label="Leg. N°" value={form.numeroDeMiembro}/><FilaDato label="Logia" value="R∴L∴ Pedro Benoit N∴ 636 · Merlo"/>
          </Tarjeta>
          <div style={{background:T.peligroBg,border:`1.5px solid ${T.peligroBorde}`,borderRadius:12,padding:"22px 26px"}}>
            <div style={{fontSize:14,fontWeight:700,color:T.peligro,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:14}}>🔒 Datos Médicos</div>
            <FilaDato label="Tipo de Sangre" value={form.sangre} peligro/><FilaDato label="Alergias" value={form.alergias}/><FilaDato label="Enfermedades" value={form.enfermedades}/><FilaDato label="Medicamentos" value={form.medicamentos}/><FilaDato label="Contacto Emerg." value={form.contactoEmergencia&&form.relacionEmergencia?`${form.contactoEmergencia} (${form.relacionEmergencia})`:form.contactoEmergencia}/><FilaDato label="Tel. Emergencia" value={form.telefonoEmergencia}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── COMUNICADOS ──────────────────────────────────────────────────────────────
function TabComunicados({ comunicados, cu, usuarios, onAgregar, onEliminar }) {
  const T = useT();
  const puedeG = puedeComun(cu);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  function publicar() {
    if(!titulo.trim()||!cuerpo.trim()) return;
    onAgregar({titulo, cuerpo, autorKey: cu.key});
    setTitulo(""); setCuerpo(""); setMostrarForm(false);
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <SecTitulo>Comunicados del Oriente</SecTitulo>
        {puedeG && (
          <Boton onClick={()=>setMostrarForm(!mostrarForm)} variante={mostrarForm?"fantasma":"primario"} chico>
            {mostrarForm ? "Cancelar" : "+ Nuevo Comunicado"}
          </Boton>
        )}
      </div>

      {mostrarForm && puedeG && (
        <Tarjeta estilo={{marginBottom:22,border:`2px solid ${T.acentoBorde}`}}>
          <div style={{fontSize:15,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:16}}>Nuevo Comunicado</div>
          <Campo label="Título" value={titulo} onChange={setTitulo} placeholder="Asunto del comunicado"/>
          <label style={{display:"block",marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:600,color:T.textoSec,marginBottom:6}}>Contenido</div>
            <textarea value={cuerpo} onChange={e=>setCuerpo(e.target.value)} rows={5} placeholder="Texto del comunicado..."
              style={{width:"100%",padding:"12px 14px",background:T.bgInput,border:`2px solid ${T.border}`,borderRadius:8,color:T.texto,fontSize:16,fontFamily:FF,outline:"none",resize:"vertical",lineHeight:1.8,boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor=T.acento} onBlur={e=>e.target.style.borderColor=T.border}/>
          </label>
          <div style={{display:"flex",gap:10}}>
            <Boton onClick={publicar}>Publicar</Boton>
            <Boton onClick={()=>setMostrarForm(false)} variante="fantasma">Cancelar</Boton>
          </div>
        </Tarjeta>
      )}

      {comunicados.map(c => {
        const autor = usuarios[c.autorKey];
        return (
          <Tarjeta key={c.id} estilo={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:T.acento,marginBottom:2}}>
                  {autor ? nomCompleto(autor) : "Oriente"}
                  {autor?.oficialidad && <span style={{color:T.textoSec,fontWeight:500,marginLeft:8}}>· {autor.oficialidad}</span>}
                </div>
                <div style={{fontSize:13,color:T.textoSec,fontWeight:500}}>{c.fecha}</div>
              </div>
              {puedeG && (
                <button onClick={()=>onEliminar(c.id)}
                  style={{background:"none",border:`1.5px solid ${T.border}`,color:T.textoSec,padding:"5px 14px",borderRadius:8,cursor:"pointer",fontFamily:FF,fontSize:14,fontWeight:600,transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.target.style.borderColor=T.peligro;e.target.style.color=T.peligro;}}
                  onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.textoSec;}}>
                  Eliminar
                </button>
              )}
            </div>
            <div style={{fontSize:17,fontWeight:700,color:T.texto,marginBottom:8}}>{c.titulo}</div>
            <p style={{fontSize:15,color:T.textoSec,lineHeight:1.8}}>{c.cuerpo}</p>
          </Tarjeta>
        );
      })}
      {comunicados.length===0 && <div style={{textAlign:"center",padding:"56px 0",color:T.textoSec,fontSize:16}}>No hay comunicados publicados.</div>}
    </div>
  );
}

// ─── PANEL VM ─────────────────────────────────────────────────────────────────
function TabVM({ tenidas, setTenidas, dbOk, usuarios, confs, planchas, msg, actualizarMasonico, agregarMiembro, eliminarMiembro, eliminarPlancha }) {
  const T = useT();
  const [subTab, setSubTab] = useState("asistentes");
  const ST = [{id:"asistentes",label:"Asistentes"},{id:"miembros",label:"Miembros"},{id:"tenidas",label:"Tenidas"},{id:"planchas",label:"Planchas"}];
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
        <div style={{fontSize:22,color:T.acento,fontWeight:800}}>✦</div>
        <div>
          <div style={{fontSize:20,fontWeight:800,color:T.texto}}>Panel Administrativo — Venerable Maestro</div>
          <div style={{fontSize:14,color:T.textoSec,fontWeight:500}}>R∴L∴ Pedro Benoit N∴ 636 · Merlo</div>
        </div>
      </div>
      <div style={{display:"flex",borderBottom:`2px solid ${T.border}`,marginBottom:26,overflowX:"auto"}}>
        {ST.map(x => (
          <button key={x.id} onClick={()=>setSubTab(x.id)} style={{padding:"12px 18px",background:"none",border:"none",borderBottom:`3px solid ${subTab===x.id?T.acento:"transparent"}`,color:subTab===x.id?T.acento:T.textoSec,cursor:"pointer",fontFamily:FF,fontSize:15,fontWeight:subTab===x.id?700:500,whiteSpace:"nowrap",transition:"all 0.2s"}}>{x.label}</button>
        ))}
      </div>
      {subTab==="asistentes" && <VMAsistentes tenidas={tenidas} usuarios={usuarios} confs={confs}/>}
      {subTab==="miembros" && <VMMiembros usuarios={usuarios} actualizarMasonico={actualizarMasonico} agregarMiembro={agregarMiembro} eliminarMiembro={eliminarMiembro} msg={msg}/>}
      {subTab==="tenidas" && <VMTenidas tenidas={tenidas} setTenidas={setTenidas} dbOk={dbOk} msg={msg}/>}
      {subTab==="planchas" && <VMPlanchas planchas={planchas} usuarios={usuarios} eliminarPlancha={eliminarPlancha}/>}
    </div>
  );
}

// ─── VM: ASISTENTES ──────────────────────────────────────────────────────────
function VMAsistentes({ tenidas, usuarios, confs }) {
  const T = useT();
  const hoy = new Date();
  const proximas = tenidas.filter(t => new Date(t.fecha+"T12:00:00")>=hoy).sort((a,b)=>a.fecha.localeCompare(b.fecha));
  const clavesUsuarios = Object.keys(usuarios);

  return (
    <div>
      <SecTitulo>Confirmaciones por Tenida</SecTitulo>
      {proximas.length===0 && <div style={{textAlign:"center",padding:"48px 0",color:T.textoSec,fontSize:16}}>No hay tenidas próximas.</div>}
      {proximas.map(ten => {
        const confTenida = confs[ten.id] || {};
        const asisten = clavesUsuarios.filter(k => confTenida[k]?.asistencia===true);
        const noAsisten = clavesUsuarios.filter(k => confTenida[k]?.asistencia===false);
        const sinConf = clavesUsuarios.filter(k => confTenida[k]?.asistencia===undefined);
        const conAgape = clavesUsuarios.filter(k => confTenida[k]?.agape===true);
        const total = clavesUsuarios.length;
        return (
          <Tarjeta key={ten.id} estilo={{marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
              <div>
                <div style={{fontSize:17,fontWeight:700,color:T.texto}}>{ten.tipo}</div>
                <div style={{fontSize:14,color:T.acento,fontWeight:600,marginTop:2}}>{fLargo(ten.fecha)} · {ten.hora} hs</div>
              </div>
              <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
                <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:800,color:T.acento}}>{asisten.length}</div><div style={{fontSize:12,fontWeight:700,color:T.acento,letterSpacing:"0.1em"}}>ASISTEN</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:800,color:T.peligro}}>{noAsisten.length}</div><div style={{fontSize:12,fontWeight:700,color:T.peligro,letterSpacing:"0.1em"}}>NO ASISTEN</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:800,color:T.textoSec}}>{sinConf.length}</div><div style={{fontSize:12,fontWeight:700,color:T.textoSec,letterSpacing:"0.1em"}}>SIN CONF.</div></div>
                {ten.agape && <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:800,color:T.cyan}}>{conAgape.length}</div><div style={{fontSize:12,fontWeight:700,color:T.cyan,letterSpacing:"0.1em"}}>ÁGAPE</div></div>}
                <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:800,color:T.textoFaint}}>{total}</div><div style={{fontSize:12,fontWeight:700,color:T.textoFaint,letterSpacing:"0.1em"}}>TOTAL</div></div>
              </div>
            </div>
            <div style={{height:8,background:T.border,borderRadius:4,marginBottom:16,overflow:"hidden",display:"flex"}}>
              <div style={{height:"100%",width:`${total>0?(asisten.length/total*100):0}%`,background:T.acento,transition:"width 0.4s"}}/>
              <div style={{height:"100%",width:`${total>0?(noAsisten.length/total*100):0}%`,background:T.peligro,transition:"width 0.4s"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,borderBottom:`2px solid ${T.acento}40`,paddingBottom:4}}>✓ Asisten ({asisten.length})</div>
                {asisten.length===0 ? <div style={{fontSize:14,color:T.textoFaint,fontStyle:"italic"}}>—</div>
                  : asisten.map(k => {
                    const u = usuarios[k];
                    return u ? <div key={k} style={{fontSize:14,color:T.texto,padding:"3px 0",borderBottom:`1px solid ${T.border}`,fontWeight:500}}>{nomCompleto(u)}{confTenida[k]?.agape&&<span style={{fontSize:12,color:T.cyan,marginLeft:6,fontWeight:700}}>+ágape</span>}</div> : null;
                  })}
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:T.peligro,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,borderBottom:`2px solid ${T.peligro}40`,paddingBottom:4}}>✗ No asisten ({noAsisten.length})</div>
                {noAsisten.length===0 ? <div style={{fontSize:14,color:T.textoFaint,fontStyle:"italic"}}>—</div>
                  : noAsisten.map(k => { const u=usuarios[k]; return u?<div key={k} style={{fontSize:14,color:T.texto,padding:"3px 0",borderBottom:`1px solid ${T.border}`,fontWeight:500}}>{nomCompleto(u)}</div>:null; })}
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:T.textoSec,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,borderBottom:`2px solid ${T.border}`,paddingBottom:4}}>? Sin confirmar ({sinConf.length})</div>
                {sinConf.length===0 ? <div style={{fontSize:14,color:T.textoFaint,fontStyle:"italic"}}>Todos confirmaron</div>
                  : sinConf.map(k => { const u=usuarios[k]; return u?<div key={k} style={{fontSize:14,color:T.texto,padding:"3px 0",borderBottom:`1px solid ${T.border}`,fontWeight:500}}>{nomCompleto(u)}</div>:null; })}
              </div>
            </div>
          </Tarjeta>
        );
      })}
    </div>
  );
}

// ─── VM: MIEMBROS ────────────────────────────────────────────────────────────
function VMMiembros({ usuarios, actualizarMasonico, agregarMiembro, eliminarMiembro, msg }) {
  const T = useT();
  const [editandoKey, setEditandoKey] = useState(null);
  const [formEdit, setFormEdit] = useState({});
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const [formNuevo, setFormNuevo] = useState({username:"",password:"1234",nombre:"",apellido:"",grado:"Aprendiz",oficialidad:"",fechaIniciacion:"",numeroDeMiembro:""});

  const lista = Object.entries(usuarios).sort(([,a],[,b]) => {
    const o={"Maestro":1,"Compañero":2,"Aprendiz":3};
    return o[a.grado]-o[b.grado] || nomCompleto(a).localeCompare(nomCompleto(b));
  });

  function iniciarEdicion(k, u) {
    setEditandoKey(k);
    setFormEdit({
      nombre: u.perfil?.nombre||"", apellido: u.perfil?.apellido||"",
      grado: u.grado, oficialidad: u.oficialidad||"",
      esVM: u.esVM||false, password: u.password,
      numeroDeMiembro: u.perfil?.numeroDeMiembro||"",
      fechaIniciacion: u.perfil?.fechaIniciacion||""
    });
  }
  function guardarEdicion(k) {
    const u = usuarios[k];
    actualizarMasonico(k, {
      grado: formEdit.grado,
      cargo: formEdit.oficialidad||"Hermano",
      oficialidad: formEdit.oficialidad,
      esVM: formEdit.esVM,
      password: formEdit.password||u.password,
      perfil: {...u.perfil, nombre:formEdit.nombre, apellido:formEdit.apellido, numeroDeMiembro:formEdit.numeroDeMiembro, fechaIniciacion:formEdit.fechaIniciacion}
    });
    setEditandoKey(null);
  }
  function registrarNuevo() {
    const k = formNuevo.username.trim().toLowerCase();
    if(!k||!formNuevo.nombre||!formNuevo.apellido){ msg("Completá usuario, nombre y apellido"); return; }
    if(usuarios[k]){ msg("Ese usuario ya existe"); return; }
    agregarMiembro(k, {
      password: formNuevo.password||"1234", grado: formNuevo.grado,
      cargo: formNuevo.oficialidad||"Hermano", oficialidad: formNuevo.oficialidad, esVM: false,
      perfil:{ nombre:formNuevo.nombre, apellido:formNuevo.apellido, email:"", telefono:"", celular:"", direccion:"", localidad:"Merlo", provincia:"Buenos Aires", fechaNacimiento:"", dni:"", profesion:"", estadoCivil:"", sangre:"", enfermedades:"", medicamentos:"", alergias:"", contactoEmergencia:"", telefonoEmergencia:"", relacionEmergencia:"", fechaIniciacion:formNuevo.fechaIniciacion||"", numeroDeMiembro:formNuevo.numeroDeMiembro||"" }
    });
    setFormNuevo({username:"",password:"1234",nombre:"",apellido:"",grado:"Aprendiz",oficialidad:"",fechaIniciacion:"",numeroDeMiembro:""});
    setMostrarNuevo(false);
  }
  function setFE(k,v){ setFormEdit(p=>({...p,[k]:v})); }
  function setFN(k,v){ setFormNuevo(p=>({...p,[k]:v})); }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <SecTitulo>Gestión de Miembros</SecTitulo>
        <Boton onClick={()=>setMostrarNuevo(!mostrarNuevo)} variante={mostrarNuevo?"fantasma":"primario"} chico>{mostrarNuevo?"Cancelar":"+ Nuevo Hermano"}</Boton>
      </div>

      {mostrarNuevo && (
        <Tarjeta estilo={{marginBottom:22,border:`2px solid ${T.acentoBorde}`}}>
          <div style={{fontSize:15,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:16}}>Registrar Nuevo Hermano</div>
          <Dos>
            <Campo label="Nombre" value={formNuevo.nombre} onChange={v=>setFN("nombre",v)}/>
            <Campo label="Apellido" value={formNuevo.apellido} onChange={v=>setFN("apellido",v)}/>
            <Campo label="Usuario (login)" value={formNuevo.username} onChange={v=>setFN("username",v)} placeholder="ej: jgonzalez"/>
            <Campo label="Contraseña" type="password" value={formNuevo.password} onChange={v=>setFN("password",v)}/>
            <Selector label="Grado" value={formNuevo.grado} onChange={v=>setFN("grado",v)} options={["Aprendiz","Compañero","Maestro"]}/>
            <Selector label="Oficialidad / Cargo" value={formNuevo.oficialidad} onChange={v=>setFN("oficialidad",v)} options={OFICIALIDADES}/>
            <Campo label="Fecha de Iniciación" type="date" value={formNuevo.fechaIniciacion} onChange={v=>setFN("fechaIniciacion",v)}/>
            <Campo label="Leg. N°" value={formNuevo.numeroDeMiembro} onChange={v=>setFN("numeroDeMiembro",v)} placeholder="00.000"/>
          </Dos>
          <div style={{display:"flex",gap:10}}>
            <Boton onClick={registrarNuevo} chico>Registrar Hermano</Boton>
            <Boton onClick={()=>setMostrarNuevo(false)} variante="fantasma" chico>Cancelar</Boton>
          </div>
        </Tarjeta>
      )}

      {lista.map(([k, u]) => {
        const gc = T.GRADO[u.grado]||T.acento;
        const editando = editandoKey===k;
        return (
          <Tarjeta key={k} estilo={{marginBottom:12,border:editando?`2px solid ${T.acentoBorde}`:undefined}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:editando?18:0}}>
              <MasonicAvatar grado={u.grado} size={44}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:16,fontWeight:700,color:T.texto}}>{nomCompleto(u)}</div>
                <div style={{fontSize:13,color:gc,fontWeight:600}}>{u.oficialidad||u.cargo} · {u.grado}{u.esVM&&<span style={{color:T.acento,marginLeft:8}}>✦ VM</span>}</div>
                <div style={{fontSize:12,color:T.textoFaint}}>@{k} · Leg. {u.perfil?.numeroDeMiembro||"—"} · Clave: {u.password}</div>
              </div>
              {!editando && (
                <div style={{display:"flex",gap:8}}>
                  <Boton onClick={()=>iniciarEdicion(k,u)} variante="fantasma" chico>Editar</Boton>
                  {!u.esVM && <Boton onClick={()=>{ if(window.confirm("¿Eliminar a "+nomCompleto(u)+"?")) eliminarMiembro(k); }} variante="peligro" chico>✕</Boton>}
                </div>
              )}
            </div>
            {editando && (
              <div style={{paddingTop:14,borderTop:`1.5px solid ${T.border}`}}>
                <div style={{fontSize:14,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:14}}>Editando: {nomCompleto(u)}</div>
                <Dos>
                  <Campo label="Nombre" value={formEdit.nombre} onChange={v=>setFE("nombre",v)}/>
                  <Campo label="Apellido" value={formEdit.apellido} onChange={v=>setFE("apellido",v)}/>
                  <Selector label="Grado" value={formEdit.grado} onChange={v=>setFE("grado",v)} options={["Aprendiz","Compañero","Maestro"]}/>
                  <Selector label="Oficialidad / Cargo" value={formEdit.oficialidad} onChange={v=>setFE("oficialidad",v)} options={OFICIALIDADES}/>
                  <Campo label="Leg. N°" value={formEdit.numeroDeMiembro} onChange={v=>setFE("numeroDeMiembro",v)}/>
                  <Campo label="Nueva contraseña" type="password" value={formEdit.password} onChange={v=>setFE("password",v)}/>
                </Dos>
                <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:14}}>
                  <input type="checkbox" checked={formEdit.esVM||false} onChange={e=>setFE("esVM",e.target.checked)} style={{accentColor:T.acento,width:16,height:16}}/>
                  <span style={{fontSize:15,color:T.textoSec,fontWeight:600}}>Es Venerable Maestro</span>
                </label>
                <div style={{display:"flex",gap:10}}>
                  <Boton onClick={()=>guardarEdicion(k)} chico>Guardar</Boton>
                  <Boton onClick={()=>setEditandoKey(null)} variante="fantasma" chico>Cancelar</Boton>
                </div>
              </div>
            )}
          </Tarjeta>
        );
      })}
    </div>
  );
}

// ─── VM: TENIDAS ──────────────────────────────────────────────────────────────
function GenerarTenidasMasivo({ tenidas, setTenidas, msg }) {
  const T = useT();
  const [mostrar, setMostrar] = useState(false);
  const [semanas, setSemanas] = useState([1,3]);  // 1=primer, 3=tercer viernes
  const [hora, setHora] = useState("19:00");
  const [tipo, setTipo] = useState("Tenida de Instrucción");
  const [grado, setGrado] = useState("Aprendiz");
  const [agape, setAgape] = useState(true);
  const [mesesAdelante, setMesesAdelante] = useState(6);

  const opSemanas = [{v:1,l:"1ros Viernes"},{v:2,l:"2dos Viernes"},{v:3,l:"3ros Viernes"},{v:4,l:"4tos Viernes"},{v:5,l:"5tos Viernes"}];

  function toggleSemana(n) {
    setSemanas(prev => prev.includes(n) ? prev.filter(x=>x!==n) : [...prev,n]);
  }

  function generarFechas() {
    // Get all selected Fridays for the next N months
    const hoy = new Date();
    const fechas = [];
    for (let m = 0; m < mesesAdelante; m++) {
      const anio = hoy.getFullYear() + Math.floor((hoy.getMonth() + m) / 12);
      const mes = (hoy.getMonth() + m) % 12;
      // Get all Fridays in this month
      const viernesDelMes = [];
      const d = new Date(anio, mes, 1);
      while (d.getDay() !== 5) d.setDate(d.getDate()+1); // first Friday
      while (d.getMonth() === mes) {
        viernesDelMes.push(new Date(d));
        d.setDate(d.getDate()+7);
      }
      // Select by position (1st, 3rd, 5th = index 0,2,4)
      semanas.forEach(s => {
        const idx = s - 1;
        if (viernesDelMes[idx]) {
          const fecha = viernesDelMes[idx];
          if (fecha >= hoy) {
            const str = fecha.toISOString().slice(0,10);
            fechas.push(str);
          }
        }
      });
    }
    return [...new Set(fechas)].sort();
  }

  async function generar() {
    if (semanas.length === 0) { msg("Seleccioná al menos un viernes"); return; }
    const fechas = generarFechas();
    if (fechas.length === 0) { msg("No hay fechas futuras para generar"); return; }
    const idMax = Math.max(...tenidas.map(t=>t.id), 0);
    const nuevas = fechas.map((fecha, i) => ({
      id: idMax + i + 1,
      fecha,
      hora,
      tipo,
      grado,
      agape,
      descripcion: `${opSemanas.find(x=>x.v===semanas[semanas.indexOf(semanas[i%semanas.length])])?.l||"Viernes"} — ${tipo}.`
    }));
    // Filter out already existing dates
    const existentes = new Set(tenidas.map(t=>t.fecha));
    const sinDuplicados = nuevas.filter(t => !existentes.has(t.fecha));
    if (sinDuplicados.length === 0) { msg("Todas esas fechas ya existen"); return; }
    setTenidas(prev => [...prev, ...sinDuplicados].sort((a,b)=>a.fecha.localeCompare(b.fecha)));
    msg("✓ " + sinDuplicados.length + " tenidas generadas");
    setMostrar(false);
  }

  return (
    <div style={{marginBottom:16}}>
      <Boton onClick={()=>setMostrar(!mostrar)} variante={mostrar?"fantasma":"primario"} chico>
        {mostrar ? "Cancelar" : "⚙ Generar Tenidas Masivamente"}
      </Boton>
      {mostrar && (
        <Tarjeta estilo={{marginTop:14,border:`2px solid ${T.acentoBorde}`}}>
          <div style={{fontSize:15,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:18}}>Generador Masivo de Tenidas</div>

          <div style={{marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:600,color:T.textoSec,marginBottom:10}}>¿Qué viernes del mes?</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {opSemanas.map(op => (
                <button key={op.v} onClick={()=>toggleSemana(op.v)}
                  style={{padding:"8px 16px",borderRadius:8,border:`2px solid ${semanas.includes(op.v)?T.acento:T.border}`,background:semanas.includes(op.v)?T.acentoBg:"transparent",color:semanas.includes(op.v)?T.acento:T.textoSec,fontFamily:FF,fontSize:14,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>
                  {op.l}
                </button>
              ))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
            <Campo label="Hora" type="time" value={hora} onChange={setHora}/>
            <Selector label="Meses a generar" value={String(mesesAdelante)} onChange={v=>setMesesAdelante(Number(v))} options={[{v:"3",l:"3 meses"},{v:"6",l:"6 meses"},{v:"12",l:"12 meses"}]}/>
            <Selector label="Tipo de Tenida" value={tipo} onChange={setTipo} options={["Tenida de Instrucción","Tenida Ordinaria","Tenida de Iniciación","Tenida de Perfección","Tenida Solsticial","Tenida Blanca","Tenida Especial"]}/>
            <Selector label="Grado" value={grado} onChange={setGrado} options={["Aprendiz","Compañero","Maestro","Todos"]}/>
          </div>

          <label style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,cursor:"pointer"}}>
            <input type="checkbox" checked={agape} onChange={e=>setAgape(e.target.checked)} style={{accentColor:T.acento,width:16,height:16}}/>
            <span style={{fontSize:15,color:T.textoSec,fontWeight:600}}>Incluye Ágape en todas</span>
          </label>

          <div style={{background:T.acentoBg,border:`1px solid ${T.acentoBorde}`,borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:14,color:T.textoSec}}>
            Se generarán <strong style={{color:T.texto}}>{generarFechas().length}</strong> tenidas nuevas (omitiendo fechas ya existentes).
          </div>

          <div style={{display:"flex",gap:10}}>
            <Boton onClick={generar}>Generar Tenidas</Boton>
            <Boton onClick={()=>setMostrar(false)} variante="fantasma">Cancelar</Boton>
          </div>
        </Tarjeta>
      )}
    </div>
  );
}

function VMTenidas({ tenidas, setTenidas, dbOk, msg }) {
  const T = useT();
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [formNueva, setFormNueva] = useState({fecha:"",hora:"19:00",tipo:"Tenida de Instrucción",grado:"Aprendiz",agape:true,descripcion:""});

  function agregar() {
    if(!formNueva.fecha) return;
    const id = Math.max(...tenidas.map(t=>t.id),0)+1;
    if (dbOk) {
      try {
        const r = await DB.insertTenida(formNueva);
        setTenidas(p=>[...p,r].sort((a,b)=>a.fecha.localeCompare(b.fecha)));
        setFormNueva({fecha:"",hora:"19:00",tipo:"Tenida de Instrucción",grado:"Aprendiz",agape:true,descripcion:""});
        setMostrarNueva(false); msg("✓ Tenida agregada"); return;
      } catch(e) { console.error(e); }
    }
    setTenidas(p=>[...p,{...formNueva,id:Math.max(...tenidas.map(t=>t.id),0)+1}].sort((a,b)=>a.fecha.localeCompare(b.fecha)));
    setFormNueva({fecha:"",hora:"19:00",tipo:"Tenida de Instrucción",grado:"Aprendiz",agape:true,descripcion:""});
    setMostrarNueva(false); msg("✓ Tenida agregada");
  }
  async function eliminar(id){ setTenidas(p=>p.filter(t=>t.id!==id)); if(dbOk) DB.deleteTenida(id).catch(console.error); msg("Tenida eliminada"); }
  async function guardarEdicion(id, datos){ setTenidas(p=>p.map(t=>t.id===id?{...t,...datos}:t)); if(dbOk) DB.updateTenida(id, datos).catch(console.error); setEditandoId(null); msg("✓ Tenida actualizada"); }
  function setFN(k,v){ setFormNueva(p=>({...p,[k]:v})); }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <SecTitulo>Tenidas del Almanaque</SecTitulo>
        <Boton onClick={()=>setMostrarNueva(!mostrarNueva)} variante={mostrarNueva?"fantasma":"primario"} chico>{mostrarNueva?"Cancelar":"+ Nueva Tenida"}</Boton>
      </div>
      {mostrarNueva && (
        <Tarjeta estilo={{marginBottom:20,border:`2px solid ${T.acentoBorde}`}}>
          <div style={{fontSize:15,fontWeight:700,color:T.acento,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:16}}>Nueva Tenida</div>
          <Dos>
            <Campo label="Fecha" type="date" value={formNueva.fecha} onChange={v=>setFN("fecha",v)}/>
            <Campo label="Hora" type="time" value={formNueva.hora} onChange={v=>setFN("hora",v)}/>
          </Dos>
          <Selector label="Tipo de Tenida" value={formNueva.tipo} onChange={v=>setFN("tipo",v)} options={["Tenida de Instrucción","Tenida Ordinaria","Tenida de Iniciación","Tenida de Perfección","Tenida Solsticial","Tenida Blanca","Tenida Especial"]}/>
          <Selector label="Grado" value={formNueva.grado} onChange={v=>setFN("grado",v)} options={["Aprendiz","Compañero","Maestro","Todos"]}/>
          <label style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer"}}>
            <input type="checkbox" checked={formNueva.agape} onChange={e=>setFN("agape",e.target.checked)} style={{accentColor:T.acento,width:16,height:16}}/>
            <span style={{fontSize:15,color:T.textoSec,fontWeight:600}}>Incluye Ágape</span>
          </label>
          <Campo label="Descripción" value={formNueva.descripcion} onChange={v=>setFN("descripcion",v)} placeholder="Descripción opcional"/>
          <Boton onClick={agregar} chico>Agregar al Almanaque</Boton>
        </Tarjeta>
      )}
      <GenerarTenidasMasivo tenidas={tenidas} setTenidas={setTenidas} msg={msg}/>

      {tenidas.sort((a,b)=>a.fecha.localeCompare(b.fecha)).map(ten => (
        editandoId===ten.id
          ? <EditarTenida key={ten.id} tenida={ten} onGuardar={d=>guardarEdicion(ten.id,d)} onCancelar={()=>setEditandoId(null)}/>
          : (
            <div key={ten.id} style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderRadius:10,padding:"14px 18px",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:T.texto}}>{ten.tipo}</div>
                <div style={{fontSize:13,color:T.acento,fontWeight:500}}>{fCorto(ten.fecha)} · {ten.hora} · {ten.grado}{ten.agape?" · Ágape":""}</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <Boton onClick={()=>setEditandoId(ten.id)} variante="fantasma" chico>Editar</Boton>
                <Boton onClick={()=>eliminar(ten.id)} variante="peligro" chico>Eliminar</Boton>
              </div>
            </div>
          )
      ))}
    </div>
  );
}

function EditarTenida({ tenida, onGuardar, onCancelar }) {
  const T = useT();
  const [form, setForm] = useState({...tenida});
  function set(k,v){ setForm(p=>({...p,[k]:v})); }
  return (
    <div style={{background:T.acentoBg,border:`2px solid ${T.acentoBorde}`,borderRadius:10,padding:"18px 22px",marginBottom:10}}>
      <Dos>
        <Campo label="Fecha" type="date" value={form.fecha} onChange={v=>set("fecha",v)}/>
        <Campo label="Hora" type="time" value={form.hora} onChange={v=>set("hora",v)}/>
        <Campo label="Tipo" value={form.tipo} onChange={v=>set("tipo",v)}/>
        <Selector label="Grado" value={form.grado} onChange={v=>set("grado",v)} options={["Aprendiz","Compañero","Maestro","Todos"]}/>
      </Dos>
      <label style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,cursor:"pointer"}}>
        <input type="checkbox" checked={form.agape} onChange={e=>set("agape",e.target.checked)} style={{accentColor:T.acento}}/>
        <span style={{fontSize:15,color:T.textoSec,fontWeight:600}}>Incluye Ágape</span>
      </label>
      <Campo label="Descripción" value={form.descripcion} onChange={v=>set("descripcion",v)}/>
      <div style={{display:"flex",gap:10}}>
        <Boton onClick={()=>onGuardar(form)} chico>Guardar</Boton>
        <Boton onClick={onCancelar} variante="fantasma" chico>Cancelar</Boton>
      </div>
    </div>
  );
}

// ─── VM: PLANCHAS ─────────────────────────────────────────────────────────────
function VMPlanchas({ planchas, usuarios, eliminarPlancha }) {
  const T = useT();
  const GC = {"Maestro":T.acento,"Compañero":T.cyan,"Aprendiz":"#a78bfa"};
  return (
    <div>
      <SecTitulo>Todas las Planchas</SecTitulo>
      {["Maestro","Compañero","Aprendiz"].map(g => {
        const delGrado = planchas.filter(p=>p.grado===g).sort((a,b)=>b.fecha.localeCompare(a.fecha));
        if(!delGrado.length) return null;
        const gc = GC[g]||T.acento;
        return (
          <div key={g} style={{marginBottom:28}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:"0.2em",color:gc,textTransform:"uppercase",marginBottom:12}}>{g==="Maestro"?"⬟":g==="Compañero"?"⬡":"○"} Planchas de {g}</div>
            {delGrado.map(p => {
              const autor = usuarios[p.autorKey];
              return (
                <div key={p.id} style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderLeft:`4px solid ${gc}`,borderRadius:10,padding:"14px 18px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:700,color:T.texto}}>{p.titulo}</div>
                    <div style={{fontSize:13,color:T.textoSec,marginTop:2,fontWeight:500}}>{autor?nomCompleto(autor):"—"} · {fCorto(p.fecha)}</div>
                  </div>
                  <Boton onClick={()=>eliminarPlancha(p.id)} variante="peligro" chico>Eliminar</Boton>
                </div>
              );
            })}
          </div>
        );
      })}
      {planchas.length===0 && <p style={{color:T.textoSec,fontSize:15}}>No hay planchas.</p>}
    </div>
  );
}
