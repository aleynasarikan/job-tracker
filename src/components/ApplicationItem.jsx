import React from "react";

export default function ApplicationItem({ app, onEdit, onDelete, isLast }) {
  // Duruma göre Bootstrap rozet (badge) sınıflarını belirleyen yardımcı fonksiyon
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Yeni Başvuru":
        return "border border-secondary-subtle text-secondary bg-secondary-subtle";
      case "Mülakat":
        return "border border-warning-subtle text-warning bg-warning-subtle";
      case "Reddedildi":
        return "border border-danger-subtle text-danger bg-danger-subtle";
      case "Teklif İletildi":
        return "border border-success-subtle text-success bg-success-subtle";
      default:
        return "border border-secondary-subtle text-secondary bg-light";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Yeni Başvuru":
        return "bi-person-fill text-secondary";
      case "Mülakat":
        return "bi-chat-left-text-fill text-warning";
      case "Reddedildi":
        return "bi-x-circle-fill text-danger";
      case "Teklif İletildi":
        return "bi-trophy-fill text-success";
      default:
        return "bi-person";
    }
  };

  return (
    <div
      className={`card border rounded-3 p-3 bg-light-hover ${
        !isLast ? "mb-3" : ""
      }`}
    >
      <div className="row align-items-center g-3 text-center text-md-start">
        {/* Sol Bölüm: Durum İkonu */}
        <div className="col-12 col-md-auto d-flex justify-content-center">
          <div
            className="rounded-circle bg-light border d-flex align-items-center justify-content-center"
            style={{ width: "42px", height: "42px" }}
          >
            <i className={`bi ${getStatusIcon(app.status)} fs-5`}></i>
          </div>
        </div>

        {/* Aday Adı */}
        <div className="col-12 col-md-2">
          <div className="fw-semibold text-dark text-truncate" title={app.candidateName}>
            {app.candidateName}
          </div>
        </div>

        {/* Pozisyon */}
        <div className="col-12 col-md-2">
          <div className="text-secondary text-truncate" title={app.position}>
            {app.position}
          </div>
        </div>

        {/* CV Linki */}
        <div className="col-12 col-md-2">
          <a
            href={app.cvLink}
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none text-primary d-inline-flex align-items-center gap-1 text-truncate w-100 justify-content-center justify-content-md-start"
            title="CV / Portfolyo Sayfası"
          >
            <i className="bi bi-link-45deg fs-5"></i>
            <span className="text-truncate small">
              CV / Portfolyo Gör
            </span>
          </a>
        </div>

        {/* Tarih */}
        <div className="col-12 col-md-2">
          <span className="text-muted small">
            {new Date(app.date).toLocaleDateString("tr-TR")}
          </span>
        </div>

        {/* Durum Badge'i */}
        <div className="col-12 col-md-2 text-md-center">
          <span
            className={`badge rounded-pill px-3 py-2 fw-medium text-capitalize ${getStatusBadgeClass(
              app.status
            )}`}
            style={{ fontSize: "0.8rem", border: "1px solid" }}
          >
            {app.status}
          </span>
        </div>

        {/* Aksiyon Butonları (Düzenle & Sil) */}
        <div className="col-12 col-md-2 text-md-end d-flex justify-content-center justify-content-md-end gap-2">
          <button
            onClick={() => onEdit(app)}
            className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
            title="Düzenle"
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button
            onClick={() => onDelete(app.id)}
            className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
            title="Sil"
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
