import React, { useState, useEffect } from "react";

export default function ApplicationForm({ editApp, onSubmit, onCancel }) {
  const [candidateName, setCandidateName] = useState("");
  const [position, setPosition] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("Yeni Başvuru");

  // Edit edilecek eleman değiştiğinde form alanlarını dolduralım
  useEffect(() => {
    if (editApp) {
      setCandidateName(editApp.candidateName || "");
      setPosition(editApp.position || "");
      setCvLink(editApp.cvLink || "");
      setDate(editApp.date || new Date().toISOString().split("T")[0]);
      setStatus(editApp.status || "Yeni Başvuru");
    } else {
      setCandidateName("");
      setPosition("");
      setCvLink("");
      setDate(new Date().toISOString().split("T")[0]);
      setStatus("Yeni Başvuru");
    }
  }, [editApp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!candidateName.trim() || !position.trim() || !date) return;

    const appData = {
      candidateName: candidateName.trim(),
      position: position.trim(),
      cvLink: cvLink.trim() || "https://example.com",
      date,
      status,
    };

    if (editApp) {
      onSubmit({ ...editApp, ...appData });
    } else {
      onSubmit(appData);
    }
  };

  return (
    <div className="card border rounded-4 p-4 bg-white shadow-sm mb-4 animate__animated animate__fadeIn">
      <h5 className="card-title fw-bold mb-4 text-dark d-flex align-items-center gap-2">
        <i className={`bi ${editApp ? "bi-pencil-square text-warning" : "bi-plus-circle-fill text-primary"}`}></i>
        {editApp ? "Aday Başvurusunu Düzenle" : "Yeni Aday Ekle"}
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Aday Adı */}
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small fw-semibold">Aday Adı Soyadı</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Örn: Ahmet Yılmaz"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
          </div>

          {/* Pozisyon */}
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small fw-semibold">Başvurulan Pozisyon</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Örn: Senior Frontend Developer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          {/* Link */}
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small fw-semibold">CV / Portfolyo Linki</label>
            <input
              type="url"
              className="form-control rounded-3"
              placeholder="https://linkedin.com/in/..."
              value={cvLink}
              onChange={(e) => setCvLink(e.target.value)}
            />
          </div>

          {/* Tarih */}
          <div className="col-12 col-md-3">
            <label className="form-label text-muted small fw-semibold">Tarih</label>
            <input
              type="date"
              className="form-control rounded-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Durum */}
          <div className="col-12 col-md-3">
            <label className="form-label text-muted small fw-semibold">Durum</label>
            <select
              className="form-select rounded-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Yeni Başvuru">Yeni Başvuru</option>
              <option value="Mülakat">Mülakat</option>
              <option value="Teklif İletildi">Teklif İletildi</option>
              <option value="Reddedildi">Reddedildi</option>
            </select>
          </div>

          {/* Butonlar */}
          <div className="col-12 d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-light border rounded-3 px-4"
              onClick={onCancel}
            >
              İptal
            </button>
            <button
              type="submit"
              className={`btn ${editApp ? "btn-warning text-dark" : "btn-primary"} rounded-3 px-4 fw-semibold`}
            >
              {editApp ? "Güncelle" : "Kaydet"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
