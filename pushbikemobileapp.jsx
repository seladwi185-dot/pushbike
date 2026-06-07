    import { useState, useEffect } from "react";
  
    const USERS = {
      ortu: { pass: "ortu123", role: "ortu", nama: "Budi Santoso", noHp: "081234567890" },
      sekretaris: { pass: "sek123", role: "sekretaris", nama: "Dewi Rahayu", noHp: "089876543210" },
    };
  
    const initialPendaftar = [
      { id: "PD-001", namaAnak: "Arjuna Pratama", tglLahir: "2020-03-12", jk: "Laki-laki", namaOrtu: "Budi Santoso", noHp: "081234567890", alamat: "Pekalongan Barat", status: "Aktif", tglDaftar: "2026-01-10" },
      { id: "PD-002", namaAnak: "Siti Rahayu", tglLahir: "2021-07-22", jk: "Perempuan", namaOrtu: "Ahmad Fauzi", noHp: "082345678901", alamat: "Kraton Kidul, Kota Pekalongan", status: "Aktif", tglDaftar: "2026-01-14" },
      { id: "PD-003", namaAnak: "Dimas Kurniawan", tglLahir: "2020-01-05", jk: "Laki-laki", namaOrtu: "Rini Wulandari", noHp: "083456789012", alamat: "Kedungwuni, Kab. Pekalongan", status: "Aktif", tglDaftar: "2026-01-15" },
      { id: "PD-004", namaAnak: "Lestari Dewi", tglLahir: "2021-11-30", jk: "Perempuan", namaOrtu: "Eko Prasetyo", noHp: "084567890123", alamat: "Noyontaan, Pekalongan Timur", status: "Pending", tglDaftar: "2026-01-18" },
    ];
  
    function getInitials(name) {
      return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
    }
  
    function StatusBadge({ status }) {
      const styles = {
        Aktif: { bg: "#d1fae5", color: "#065f46", label: "Aktif" },
        Pending: { bg: "#fef3c7", color: "#92400e", label: "Pending" },
        Ditolak: { bg: "#fee2e2", color: "#991b1b", label: "Ditolak" },
      };
      const s = styles[status] || styles.Pending;
      return (
        <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20, letterSpacing: 0.3 }}>
          {s.label}
        </span>
      );
    }
  
    // ─── LOGIN SCREEN ────────────────────────────────────────────────────────────
    function LoginScreen({ onLogin }) {
      const [role, setRole] = useState("ortu");
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
  
      function handleLogin() {
        setError("");
        setLoading(true);
        setTimeout(() => {
          const acc = USERS[username];
          if (!acc || acc.pass !== password || acc.role !== role) {
            setError("Username atau password salah");
            setLoading(false);
            return;
          }
          setLoading(false);
          onLogin({ ...acc, username });
        }, 600);
      }
  
      return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f3d13 0%, #1b6b20 60%, #4caf50 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
          <div style={{ width: "100%", maxWidth: 380, background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 52, lineHeight: 1.1 }}>🚲</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0f3d13", letterSpacing: -0.5 }}>Club Pushbike</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Sistem Pendaftaran Anggota</div>
            </div>
  
            <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 10, padding: 3, marginBottom: 20 }}>
              {["ortu", "sekretaris"].map((r) => (
                <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "8px 0", border: "none", borderRadius: 8, background: role === r ? "#fff" : "none", color: role === r ? "#1b6b20" : "#9ca3af", fontWeight: role === r ? 700 : 500, fontSize: 13, cursor: "pointer", boxShadow: role === r ? "0 2px 6px rgba(0,0,0,0.1)" : "none", transition: "all .2s" }}>
                  {r === "ortu" ? "👨‍👩‍👦 Orang Tua" : "💼 Sekretaris"}
                </button>
              ))}
            </div>
  
            {error && (
              <div style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, fontWeight: 600 }}>
                ⚠️ {error}
              </div>
            )}
  
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5 }}>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" style={{ width: "100%", marginTop: 4, padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5 }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={{ width: "100%", marginTop: 4, padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
  
            <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "#9ca3af" : "#1b6b20", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", transition: "background .2s" }}>
              {loading ? "Memproses..." : "🔐 Masuk"}
            </button>
  
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#9ca3af" }}>
              Demo: <strong>ortu / ortu123</strong> &nbsp;|&nbsp; <strong>sekretaris / sek123</strong>
            </div>
          </div>
        </div>
      );
    }
  
    // ─── BERANDA ORTU ─────────────────────────────────────────────────────────────
    function BerandaOrtu({ pendaftar, user }) {
      const myData = pendaftar.filter((p) => p.namaOrtu === user.nama);
      return (
        <div style={{ padding: 16 }}>
          <div style={{ background: "linear-gradient(135deg, #0f3d13, #1b6b20)", borderRadius: 16, padding: "20px 20px 24px", color: "#fff", marginBottom: 20 }}>
            <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 4 }}>Selamat datang,</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{user.nama}</div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>Orang Tua / Wali Anggota</div>
          </div>
  
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#1b6b20" }}>{myData.length}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Pendaftaran Saya</div>
              <div style={{ marginTop: 6, background: "#fef3c7", color: "#92400e", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, display: "inline-block" }}>Aktif</div>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#1b6b20" }}>2026</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Tahun Aktif</div>
              <div style={{ marginTop: 6, background: "#dbeafe", color: "#1e40af", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, display: "inline-block" }}>Berjalan</div>
            </div>
          </div>
  
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6", fontWeight: 700, fontSize: 14 }}>📋 Status Pendaftaran</div>
            {myData.length === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>Belum ada pendaftaran</div>
            ) : (
              myData.map((p) => (
                <div key={p.id} style={{ padding: "14px 16px", borderBottom: "1px solid #f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.namaAnak}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{p.tglDaftar}</div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
  
    // ─── FORM PENDAFTARAN ─────────────────────────────────────────────────────────
    function FormDaftar({ onSubmit, defaultOrtu }) {
      const [form, setForm] = useState({ namaAnak: "", tglLahir: "", jk: "Laki-laki", namaOrtu: defaultOrtu || "", noHp: "", alamat: "" });
      const [success, setSuccess] = useState(false);
  
      function handleChange(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  
      function handleSubmit() {
        if (!form.namaAnak || !form.tglLahir || !form.namaOrtu || !form.noHp || !form.alamat) {
          alert("Semua field wajib diisi!");
          return;
        }
        onSubmit(form);
        setSuccess(true);
        setForm({ namaAnak: "", tglLahir: "", jk: "Laki-laki", namaOrtu: defaultOrtu || "", noHp: "", alamat: "" });
        setTimeout(() => setSuccess(false), 4000);
      }
  
      const inputStyle = { width: "100%", padding: "11px 13px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fff" };
      const labelStyle = { fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, display: "block" };
  
      return (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg, #0f3d13, #1b6b20)", padding: "16px 18px", color: "#fff" }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>📝 Formulir Pendaftaran Online</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>Isi data anak dengan lengkap dan benar</div>
            </div>
            <div style={{ padding: 18 }}>
              {success && (
                <div style={{ background: "#d1fae5", color: "#065f46", borderRadius: 8, padding: "12px 14px", fontSize: 13, marginBottom: 16, fontWeight: 600 }}>
                  ✅ Pendaftaran berhasil! Silakan cek halaman Cetak Bukti.
                </div>
              )}
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Nama Lengkap Anak</label>
                <input value={form.namaAnak} onChange={(e) => handleChange("namaAnak", e.target.value)} placeholder="Contoh: Arjuna Pratama" style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Tanggal Lahir</label>
                  <input type="date" value={form.tglLahir} onChange={(e) => handleChange("tglLahir", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Jenis Kelamin</label>
                  <select value={form.jk} onChange={(e) => handleChange("jk", e.target.value)} style={inputStyle}>
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Nama Orang Tua / Wali</label>
                <input value={form.namaOrtu} onChange={(e) => handleChange("namaOrtu", e.target.value)} placeholder="Nama pengampu" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Nomor HP / WhatsApp</label>
                <input value={form.noHp} onChange={(e) => handleChange("noHp", e.target.value)} placeholder="08xxxxxxxxxx" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Alamat Domisili</label>
                <textarea value={form.alamat} onChange={(e) => handleChange("alamat", e.target.value)} rows={2} placeholder="Alamat jalan, RT/RW, Kecamatan" style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleSubmit} style={{ flex: 1, padding: "12px", background: "#1b6b20", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  📤 Kirim Formulir
                </button>
                <button onClick={() => setForm({ namaAnak: "", tglLahir: "", jk: "Laki-laki", namaOrtu: defaultOrtu || "", noHp: "", alamat: "" })} style={{ padding: "12px 16px", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10, cursor: "pointer", fontSize: 14 }}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    // ─── CETAK BUKTI ──────────────────────────────────────────────────────────────
    function CetakBukti({ lastForm, pendaftar }) {
      const data = lastForm || pendaftar[0];
      if (!data) return <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Belum ada data untuk dicetak.</div>;
  
      return (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg, #0f3d13, #1b6b20)", padding: "16px 18px", color: "#fff" }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>🖨️ Lembar Verifikasi</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>Formulir Pendaftaran Resmi Club Pushbike</div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ textAlign: "center", paddingBottom: 14, marginBottom: 14, borderBottom: "2px solid #0f3d13" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#0f3d13" }}>FORMULIR PENDAFTARAN RESMI CLUB PUSHBIKE</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Arsip Dokumen Anggota Baru</div>
              </div>
              {[
                ["ID Registrasi", data.id],
                ["Nama Anak", data.namaAnak],
                ["Tanggal Lahir", data.tglLahir],
                ["Jenis Kelamin", data.jk],
                ["Orang Tua/Wali", data.namaOrtu],
                ["Kontak HP", data.noHp],
                ["Alamat", data.alamat],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 13 }}>
                  <span style={{ color: "#6b7280" }}>{k}</span>
                  <span style={{ fontWeight: 700, textAlign: "right", maxWidth: "55%" }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13 }}>
                <span style={{ color: "#6b7280" }}>Status</span>
                <StatusBadge status={data.status} />
              </div>
              <button onClick={() => alert("Fitur print akan membuka dialog cetak browser.")} style={{ width: "100%", marginTop: 16, padding: 12, background: "#1b6b20", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                🖨️ Cetak Dokumen
              </button>
            </div>
          </div>
        </div>
      );
    }
  
    // ─── BERANDA SEKRETARIS ───────────────────────────────────────────────────────
    function BerandaSek({ pendaftar }) {
      const total = pendaftar.length;
      const pending = pendaftar.filter((p) => p.status === "Pending").length;
      const aktif = pendaftar.filter((p) => p.status === "Aktif").length;
  
      return (
        <div style={{ padding: 16 }}>
          <div style={{ background: "linear-gradient(135deg, #0f3d13, #1b6b20)", borderRadius: 16, padding: "20px 20px 24px", color: "#fff", marginBottom: 20 }}>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Dashboard</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Sekretaris Club</div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>Manajemen Anggota Pushbike</div>
          </div>
  
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { num: total, label: "Total Pendaftar", bg: "#dbeafe", text: "#1e40af", badge: "Database" },
              { num: pending, label: "Belum Diverifikasi", bg: "#fef3c7", text: "#92400e", badge: "Perlu Aksi" },
              { num: aktif, label: "Anggota Aktif", bg: "#d1fae5", text: "#065f46", badge: "Terverifikasi" },
              { num: 2026, label: "Tahun Berjalan", bg: "#f3e8ff", text: "#6b21a8", badge: "Aktif" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: 14, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1b6b20" }}>{s.num}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{s.label}</div>
                <div style={{ marginTop: 6, background: s.bg, color: s.text, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, display: "inline-block" }}>{s.badge}</div>
              </div>
            ))}
          </div>
  
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6", fontWeight: 700, fontSize: 14 }}>📋 Transaksi Terbaru</div>
            {[...pendaftar].reverse().slice(0, 5).map((p) => (
              <div key={p.id} style={{ padding: "12px 16px", borderBottom: "1px solid #f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{p.namaAnak}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.namaOrtu} · {p.tglDaftar}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    // ─── KELOLA DATA ──────────────────────────────────────────────────────────────
    function KelolaData({ pendaftar, onUpdate, onDelete }) {
      const [search, setSearch] = useState("");
      const [editTarget, setEditTarget] = useState(null);
      const [delTarget, setDelTarget] = useState(null);
      const [editForm, setEditForm] = useState({});
  
      const filtered = pendaftar.filter(
        (p) => p.namaAnak.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
      );
  
      function openEdit(p) { setEditTarget(p); setEditForm({ namaAnak: p.namaAnak, namaOrtu: p.namaOrtu, noHp: p.noHp, status: p.status }); }
      function saveEdit() { onUpdate(editTarget.id, editForm); setEditTarget(null); }
  
      return (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden", marginBottom: 12 }}>
            <div style={{ padding: "10px 14px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>🔍</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau ID..." style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent" }} />
            </div>
            <div style={{ padding: "8px 14px 10px", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1b6b20", background: "#d1fae5", padding: "2px 10px", borderRadius: 20 }}>{filtered.length} entitas ditemukan</span>
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>Tidak ada data ditemukan.</div>
            ) : (
              filtered.map((p) => (
                <div key={p.id} style={{ padding: "14px 16px", borderBottom: "1px solid #f9fafb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <code style={{ fontSize: 10, background: "#f3f4f6", color: "#374151", padding: "1px 6px", borderRadius: 4 }}>{p.id}</code>
                        <StatusBadge status={p.status} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.namaAnak}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>{p.jk} · Wali: {p.namaOrtu}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>📞 {p.noHp}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginLeft: 10 }}>
                      {p.status === "Pending" && (
                        <button onClick={() => onUpdate(p.id, { status: "Aktif" })} style={{ background: "#d1fae5", color: "#065f46", border: "none", borderRadius: 7, padding: "6px 8px", cursor: "pointer", fontSize: 13 }} title="Verifikasi">✓</button>
                      )}
                      <button onClick={() => openEdit(p)} style={{ background: "#dbeafe", color: "#1e40af", border: "none", borderRadius: 7, padding: "6px 8px", cursor: "pointer", fontSize: 13 }} title="Edit">✏️</button>
                      <button onClick={() => setDelTarget(p)} style={{ background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: 7, padding: "6px 8px", cursor: "pointer", fontSize: 13 }} title="Hapus">🗑️</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
  
          {/* Edit Modal */}
          {editTarget && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
              <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: 20, width: "100%", maxWidth: 480 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>✏️ Edit Berkas Anggota</div>
                  <button onClick={() => setEditTarget(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9ca3af" }}>✕</button>
                </div>
                {[["Nama Anak", "namaAnak"], ["Nama Orang Tua", "namaOrtu"], ["No HP", "noHp"]].map(([label, key]) => (
                  <div key={key} style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 4 }}>{label}</label>
                    <input value={editForm[key] || ""} onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 4 }}>Status</label>
                  <select value={editForm.status || "Pending"} onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}>
                    <option>Pending</option><option>Aktif</option><option>Ditolak</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={saveEdit} style={{ flex: 1, padding: 12, background: "#1b6b20", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Simpan</button>
                  <button onClick={() => setEditTarget(null)} style={{ padding: "12px 20px", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10, cursor: "pointer" }}>Batal</button>
                </div>
              </div>
            </div>
          )}
  
          {/* Delete Modal */}
          {delTarget && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
              <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: 20, width: "100%", maxWidth: 480 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#991b1b", marginBottom: 12 }}>🗑️ Hapus Berkas</div>
                <p style={{ fontSize: 14, color: "#374151", marginBottom: 20 }}>
                  Yakin hapus data <strong>{delTarget.namaAnak}</strong> secara permanen?
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => { onDelete(delTarget.id); setDelTarget(null); }} style={{ flex: 1, padding: 12, background: "#991b1b", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Hapus Permanen</button>
                  <button onClick={() => setDelTarget(null)} style={{ padding: "12px 20px", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10, cursor: "pointer" }}>Batal</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  
    // ─── LAPORAN ──────────────────────────────────────────────────────────────────
    function Laporan({ pendaftar }) {
      const total = pendaftar.length;
      const aktif = pendaftar.filter((p) => p.status === "Aktif").length;
      const pending = pendaftar.filter((p) => p.status === "Pending").length;
      const ditolak = pendaftar.filter((p) => p.status === "Ditolak").length;
  
      return (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>📊 Rekapitulasi</div>
            <button onClick={() => alert("PDF berhasil digenerate dan diunduh!")} style={{ background: "#1b6b20", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              ⬇️ Unduh PDF
            </button>
          </div>
  
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { n: total, l: "Total Berkas", c: "#dbeafe", t: "#1e40af" },
              { n: aktif, l: "Valid (Aktif)", c: "#d1fae5", t: "#065f46" },
              { n: pending, l: "Pending", c: "#fef3c7", t: "#92400e" },
              { n: ditolak, l: "Ditolak", c: "#fee2e2", t: "#991b1b" },
            ].map((s) => (
              <div key={s.l} style={{ background: s.c, borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.t }}>{s.n}</div>
                <div style={{ fontSize: 11, color: s.t, opacity: 0.8, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
  
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6", fontWeight: 700, fontSize: 14 }}>Daftar Lengkap Anggota</div>
            {pendaftar.map((p, i) => (
              <div key={p.id} style={{ padding: "12px 16px", borderBottom: i < pendaftar.length - 1 ? "1px solid #f9fafb" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{p.namaAnak}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.tglLahir} · {p.namaOrtu}</div>
                    <code style={{ fontSize: 10, background: "#f3f4f6", color: "#374151", padding: "1px 5px", borderRadius: 4 }}>{p.id}</code>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    // ─── PROFIL ───────────────────────────────────────────────────────────────────
    function Profil({ user, onSave }) {
      const [nama, setNama] = useState(user.nama);
      const [hp, setHp] = useState(user.noHp || "");
  
      return (
        <div style={{ padding: 16 }}>
          <div style={{ background: "linear-gradient(135deg, #0f3d13, #1b6b20)", borderRadius: 16, padding: 20, color: "#fff", display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20 }}>
              {getInitials(user.nama)}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{user.nama}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{user.role === "ortu" ? "Orang Tua / Wali" : "Sekretaris Club"}</div>
            </div>
          </div>
  
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Detail Akun</div>
            {[
              { label: "Nama Profil", val: nama, setter: setNama, disabled: false },
              { label: "Username", val: user.username, setter: null, disabled: true },
              { label: "No Kontak HP", val: hp, setter: setHp, disabled: false },
            ].map(({ label, val, setter, disabled }) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 4 }}>{label}</label>
                <input value={val} onChange={setter ? (e) => setter(e.target.value) : undefined} disabled={disabled} style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box", background: disabled ? "#f9fafb" : "#fff", color: disabled ? "#9ca3af" : "#111" }} />
              </div>
            ))}
            <button onClick={() => { if (!nama.trim()) { alert("Nama tidak boleh kosong!"); return; } onSave({ nama, noHp: hp }); alert("Profil berhasil diperbarui!"); }} style={{ width: "100%", padding: 12, background: "#1b6b20", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              💾 Simpan Perubahan
            </button>
          </div>
        </div>
      );
    }
  
    // ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
    function TabBar({ menus, activePage, onNavigate }) {
      return (
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #e5e7eb", display: "flex", zIndex: 50, paddingBottom: "env(safe-area-inset-bottom, 4px)" }}>
          {menus.map((m) => {
            const isActive = activePage === m.page;
            return (
              <button key={m.page} onClick={() => onNavigate(m.page)} style={{ flex: 1, padding: "10px 0 8px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? "#1b6b20" : "#9ca3af", letterSpacing: 0.2 }}>{m.label}</span>
                {isActive && <div style={{ width: 20, height: 3, background: "#1b6b20", borderRadius: 2 }} />}
              </button>
            );
          })}
        </div>
      );
    }
  
    // ─── MAIN APP ─────────────────────────────────────────────────────────────────
    export default function PushbikeApp() {
      const [user, setUser] = useState(null);
      const [page, setPage] = useState("");
      const [pendaftar, setPendaftar] = useState(initialPendaftar);
      const [lastForm, setLastForm] = useState(null);
      const [idCounter, setIdCounter] = useState(5);
  
      const ortuMenus = [
        { icon: "🏠", label: "Beranda", page: "beranda" },
        { icon: "📝", label: "Daftar", page: "daftar" },
        { icon: "🖨️", label: "Cetak", page: "cetak" },
        { icon: "👤", label: "Profil", page: "profil" },
      ];
  
      const sekMenus = [
        { icon: "🏠", label: "Beranda", page: "beranda" },
        { icon: "📊", label: "Kelola", page: "kelola" },
        { icon: "📋", label: "Laporan", page: "laporan" },
        { icon: "👤", label: "Profil", page: "profil" },
      ];
  
      function handleLogin(u) { setUser(u); setPage("beranda"); }
      function handleLogout() { setUser(null); setPage(""); }
  
      function handleSubmitDaftar(form) {
        const newId = "PD-00" + idCounter;
        setIdCounter((c) => c + 1);
        const entry = { id: newId, ...form, status: "Pending", tglDaftar: new Date().toISOString().split("T")[0] };
        setPendaftar((prev) => [...prev, entry]);
        setLastForm(entry);
        setPage("cetak");
      }
  
      function handleUpdate(id, changes) {
        setPendaftar((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));
      }
  
      function handleDelete(id) {
        setPendaftar((prev) => prev.filter((p) => p.id !== id));
      }
  
      function handleSaveProfil(data) {
        setUser((u) => ({ ...u, ...data }));
      }
  
      if (!user) return <LoginScreen onLogin={handleLogin} />;
  
      const menus = user.role === "ortu" ? ortuMenus : sekMenus;
  
      function renderPage() {
        if (user.role === "ortu") {
          if (page === "beranda") return <BerandaOrtu pendaftar={pendaftar} user={user} />;
          if (page === "daftar") return <FormDaftar onSubmit={handleSubmitDaftar} defaultOrtu={user.nama} />;
          if (page === "cetak") return <CetakBukti lastForm={lastForm} pendaftar={pendaftar} />;
          if (page === "profil") return <Profil user={user} onSave={handleSaveProfil} />;
        } else {
          if (page === "beranda") return <BerandaSek pendaftar={pendaftar} />;
          if (page === "kelola") return <KelolaData pendaftar={pendaftar} onUpdate={handleUpdate} onDelete={handleDelete} />;
          if (page === "laporan") return <Laporan pendaftar={pendaftar} />;
          if (page === "profil") return <Profil user={user} onSave={handleSaveProfil} />;
        }
      }
  
      const currentMenu = menus.find((m) => m.page === page);
  
      return (
        <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#f3f4f6", position: "relative" }}>
          {/* Top Bar */}
          <div style={{ position: "sticky", top: 0, zIndex: 40, background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#0f3d13" }}>🚲 Club Pushbike</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{currentMenu?.icon} {currentMenu?.label}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{user.nama}</div>
                <div style={{ fontSize: 10, color: "#9ca3af" }}>{user.role === "ortu" ? "Orang Tua" : "Sekretaris"}</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1b6b20", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
                {getInitials(user.nama)}
              </div>
              <button onClick={handleLogout} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#9ca3af" }} title="Keluar">🚪</button>
            </div>
          </div>
  
          {/* Content */}
          <div style={{ paddingBottom: 80 }}>{renderPage()}</div>
  
          {/* Bottom Tab Bar */}
          <TabBar menus={menus} activePage={page} onNavigate={setPage} />
        </div>
      );
    }
    
