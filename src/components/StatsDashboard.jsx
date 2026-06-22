import React from "react";

export default function StatsDashboard({
  applications,
  filter,
  onFilterChange,
  showForm,
  onToggleForm,
}) {
  const totalCount = applications.length;
  const activeCount = applications.filter((app) => app.status !== "Reddedildi").length;
  const rejectedCount = applications.filter((app) => app.status === "Reddedildi").length;
  const interviewCount = applications.filter((app) => app.status === "Mülakat").length;
  const offerCount = applications.filter((app) => app.status === "Teklif İletildi").length;

  return (
    <div className="mb-4">
      {/* İstatistik Kartları */}
      <div className="row g-3 mb-4">
        {/* Toplam Başvuru */}
        <div className="col-6 col-md-3">
          <div className="card border rounded-4 p-3 bg-white shadow-sm h-100 text-center">
            <div className="rounded-circle bg-primary-subtle text-primary mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
              <i className="bi bi-briefcase-fill fs-5"></i>
            </div>
            <div className="text-muted small fw-semibold">Gelen Başvurular</div>
            <div className="fs-3 fw-bold text-dark">{totalCount}</div>
          </div>
        </div>

        {/* Aktif Başvurular */}
        <div className="col-6 col-md-3">
          <div className="card border rounded-4 p-3 bg-white shadow-sm h-100 text-center">
            <div className="rounded-circle bg-info-subtle text-info mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
              <i className="bi bi-hourglass-split fs-5"></i>
            </div>
            <div className="text-muted small fw-semibold">Devam Eden Süreçler</div>
            <div className="fs-3 fw-bold text-dark">{activeCount}</div>
          </div>
        </div>

        {/* Mülakatlar / Teklifler */}
        <div className="col-6 col-md-3">
          <div className="card border rounded-4 p-3 bg-white shadow-sm h-100 text-center">
            <div className="rounded-circle bg-success-subtle text-success mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
              <i className="bi bi-trophy-fill fs-5"></i>
            </div>
            <div className="text-muted small fw-semibold">Teklif İletilen</div>
            <div className="fs-3 fw-bold text-dark">{offerCount}</div>
          </div>
        </div>

        {/* Reddedilenler */}
        <div className="col-6 col-md-3">
          <div className="card border rounded-4 p-3 bg-white shadow-sm h-100 text-center">
            <div className="rounded-circle bg-danger-subtle text-danger mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
              <i className="bi bi-x-circle-fill fs-5"></i>
            </div>
            <div className="text-muted small fw-semibold">Reddedilen Aday</div>
            <div className="fs-3 fw-bold text-dark">{rejectedCount}</div>
          </div>
        </div>
      </div>

      {/* Filtre ve Buton Bölümü */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 pb-2 border-bottom">
        {/* Filtre Butonları */}
        <div className="d-flex gap-4">
          <button
            onClick={() => onFilterChange("Tümü")}
            className={`btn btn-link text-decoration-none pb-2 px-0 rounded-0 ${
              filter === "Tümü"
                ? "text-primary fw-bold border-bottom border-primary border-3"
                : "text-muted fw-semibold"
            }`}
          >
            Tümü <span className="badge bg-secondary ms-1">{totalCount}</span>
          </button>

          <button
            onClick={() => onFilterChange("Aktif")}
            className={`btn btn-link text-decoration-none pb-2 px-0 rounded-0 ${
              filter === "Aktif"
                ? "text-primary fw-bold border-bottom border-primary border-3"
                : "text-muted fw-semibold"
            }`}
          >
            Aktif <span className="badge bg-success ms-1">{activeCount}</span>
          </button>

          <button
            onClick={() => onFilterChange("Reddedildi")}
            className={`btn btn-link text-decoration-none pb-2 px-0 rounded-0 ${
              filter === "Reddedildi"
                ? "text-primary fw-bold border-bottom border-primary border-3"
                : "text-muted fw-semibold"
            }`}
          >
            Reddedildi <span className="badge bg-danger ms-1">{rejectedCount}</span>
          </button>
        </div>

        {/* Yeni Başvuru Ekle Butonu */}
        <button
          onClick={onToggleForm}
          className={`btn ${showForm ? "btn-secondary" : "btn-primary"} btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-1 shadow-sm fw-semibold`}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`}></i>
          <span>{showForm ? "Kapat" : "Yeni Aday Ekle"}</span>
        </button>
      </div>
    </div>
  );
}
