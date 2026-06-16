import { useState, useEffect } from "react"
import { getApplications, saveApplications } from "./utils/storage"
import './App.css'

function App() {
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState("Tümü") // "Tümü", "Aktif", "Reddedildi"
  const [showForm, setShowForm] = useState(false) // Formu gizle/göster

  // Yeni başvuru form alanları
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [link, setLink] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState("Başvuruldu")

  // Sayfa yüklendiğinde verileri localStorage'dan çek veya varsayılan veri ekle
  useEffect(() => {
    const localData = getApplications()
    if (localData.length === 0) {
      const defaultData = [
        {
          id: "1",
          company: "Google",
          position: "CEO",
          link: "https://google.com/careers",
          date: "2026-05-07",
          status: "Reddedildi"
        },
        {
          id: "2",
          company: "Apple",
          position: "Senior Designer",
          link: "https://apple.com/careers",
          date: "2026-06-12",
          status: "Başvuruldu"
        },
        {
          id: "3",
          company: "Netflix",
          position: "Frontend Developer",
          link: "https://netflix.com/careers",
          date: "2026-06-14",
          status: "Mülakat"
        },
        {
          id: "4",
          company: "Microsoft",
          position: "Product Manager",
          link: "https://careers.microsoft.com",
          date: "2026-06-16",
          status: "Teklif"
        }
      ]
      saveApplications(defaultData)
      setApplications(defaultData)
    } else {
      setApplications(localData)
    }
  }, [])

  // İstatistikleri hesaplayalım
  const totalCount = applications.length
  const activeCount = applications.filter(app => app.status !== "Reddedildi").length
  const rejectedCount = applications.filter(app => app.status === "Reddedildi").length

  // Seçilen filtreye göre başvuruları süzüyoruz
  const filteredApplications = applications.filter(app => {
    if (filter === "Tümü") return true
    if (filter === "Aktif") return app.status !== "Reddedildi"
    if (filter === "Reddedildi") return app.status === "Reddedildi"
    return true
  })

  // Duruma göre Bootstrap rozet (badge) sınıflarını belirleyen yardımcı fonksiyon
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Başvuruldu":
        return "border border-secondary-subtle text-secondary bg-secondary-subtle"
      case "Mülakat":
        return "border border-warning-subtle text-warning bg-warning-subtle"
      case "Reddedildi":
        return "border border-danger-subtle text-danger bg-danger-subtle"
      case "Teklif":
        return "border border-success-subtle text-success bg-success-subtle"
      default:
        return "border border-secondary-subtle text-secondary bg-light"
    }
  }

  // Yeni Başvuru Gönderme İşlemi
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!company || !position || !date) return

    const newApp = {
      id: Date.now().toString(),
      company,
      position,
      link: link || "https://example.com",
      date,
      status
    }

    const updatedApps = [newApp, ...applications]
    saveApplications(updatedApps)
    setApplications(updatedApps)

    // Formu temizle ve kapat
    setCompany("")
    setPosition("")
    setLink("")
    setDate(new Date().toISOString().split('T')[0])
    setStatus("Başvuruldu")
    setShowForm(false)
  }

  return (
    // container: Sayfayı ortalar ve sağ/sol boşluk bırakır. py-5: padding-y yani üst/alt boşluk verir (y-aksisi 3rem).
    <div className="container py-5">
      {/* row: Izgara satırı. justify-content-center: İçindeki sütunu yatayda ortalar. */}
      <div className="row justify-content-center">
        {/* col-12: Mobil ekranlarda tam genişlik. col-md-10: Orta ekranlarda 10/12 genişlik. col-lg-9: Büyük ekranlarda 9/12 genişlik. */}
        <div className="col-12 col-md-10 col-lg-9">
          <div className="text-center mb-5">
            <h1 className="display-6 fw-bold text-dark">İş Başvuruları Takip Paneli</h1>
            <p className="text-muted">Bootstrap 5 ile adım adım geliştiriyoruz</p>
          </div>

          {/* ADIM 3: Üst İstatistikler ve Filtre Alanı (Flexbox kullanımı) */}
          {/* d-flex: Yatayda sıralama (Flexbox container). justify-content-between: İki uca yaslar. align-items-center: Dikeyde ortalar. mb-4: margin-bottom-4. pb-2: padding-bottom-2. */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4 pb-2 border-bottom">
            {/* Sol taraf: Filtre Butonları */}
            <div className="d-flex gap-4">
              {/* Filtre Butonu - Tümü */}
              <button
                onClick={() => setFilter("Tümü")}
                className={`btn btn-link text-decoration-none pb-2 px-0 rounded-0 ${
                  filter === "Tümü"
                    ? "text-primary fw-bold border-bottom border-primary border-3"
                    : "text-muted fw-semibold"
                }`}
              >
                Total <span className="badge bg-secondary ms-1">{totalCount}</span>
              </button>

              {/* Filtre Butonu - Aktif */}
              <button
                onClick={() => setFilter("Aktif")}
                className={`btn btn-link text-decoration-none pb-2 px-0 rounded-0 ${
                  filter === "Aktif"
                    ? "text-primary fw-bold border-bottom border-primary border-3"
                    : "text-muted fw-semibold"
                }`}
              >
                aktif <span className="badge bg-success ms-1">{activeCount}</span>
              </button>

              {/* Filtre Butonu - Reddedildi */}
              <button
                onClick={() => setFilter("Reddedildi")}
                className={`btn btn-link text-decoration-none pb-2 px-0 rounded-0 ${
                  filter === "Reddedildi"
                    ? "text-primary fw-bold border-bottom border-primary border-3"
                    : "text-muted fw-semibold"
                }`}
              >
                reddedildi <span className="badge bg-danger ms-1">{rejectedCount}</span>
              </button>
            </div>

            {/* Sağ taraf: Yeni Ekleme Butonu */}
            <button
              onClick={() => setShowForm(!showForm)}
              className={`btn ${showForm ? "btn-secondary" : "btn-primary"} btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-1 shadow-sm`}
            >
              <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`}></i>
              <span>{showForm ? "Kapat" : "Yeni Ekle"}</span>
            </button>
          </div>

          {/* ADIM 6: Yeni Başvuru Ekleme Formu */}
          {showForm && (
            <div className="card border rounded-4 p-4 bg-white shadow-sm mb-4 animate__animated animate__fadeIn">
              <h5 className="card-title fw-bold mb-4 text-dark d-flex align-items-center gap-2">
                <i className="bi bi-plus-circle-fill text-primary"></i>
                Yeni Başvuru Ekle
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Şirket Adı */}
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-semibold">Şirket Adı</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="Örn: Google, Trendyol vb."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </div>

                  {/* Pozisyon */}
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-semibold">Pozisyon</label>
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
                    <label className="form-label text-muted small fw-semibold">Başvuru Linki</label>
                    <input
                      type="url"
                      className="form-control rounded-3"
                      placeholder="https://example.com/jobs/1"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
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
                      <option value="Başvuruldu">Başvuruldu</option>
                      <option value="Mülakat">Mülakat</option>
                      <option value="Teklif">Teklif</option>
                      <option value="Reddedildi">Reddedildi</option>
                    </select>
                  </div>

                  {/* Butonlar */}
                  <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-light border rounded-3 px-4"
                      onClick={() => setShowForm(false)}
                    >
                      İptal
                    </button>
                    <button type="submit" className="btn btn-primary rounded-3 px-4">
                      Kaydet
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* ADIM 4: Ana Başvuru Kutusu Kartı (Card & Borders) */}
          {/* card: Bootstrap'in ana kart bileşeni. border: Kenarlık ekler. rounded-4: Köşeleri yumuşatır (1rem radyan). p-4: İç boşluk verir. bg-white: Arka planı beyaz yapar. shadow-sm: Hafif gölge ekleyerek premium görünüm kazandırır. */}
          <div className="card border rounded-4 p-4 bg-white shadow-sm">
            <div className="card-body p-0">
              {filteredApplications.length === 0 ? (
                // Boş Liste Durumu: py-5 dikey dolgu verir. text-center içeriği ortalar.
                <div className="text-center text-muted py-5">
                  <i className="bi bi-inbox fs-1 d-block mb-2 text-secondary"></i>
                  <span>Bu filtreye uygun başvuru bulunamadı.</span>
                </div>
              ) : (
                filteredApplications.map((app, index) => (
                  // ADIM 5: Her Bir Başvuru Satırı
                  // card: Satırın kendisini küçük bir kart gibi konumlandırıyoruz.
                  // border: Çerçeve ekler. rounded-3: Köşeleri yuvarlatır. p-3: İç dolgu. mb-3: Son eleman hariç aralarında alt boşluk bırakır.
                  // bg-light-hover: Üzerine gelince rengi koyulaşması için yazdığımız CSS sınıfı.
                  <div
                    key={app.id}
                    className={`card border rounded-3 p-3 bg-light-hover ${
                      index !== filteredApplications.length - 1 ? "mb-3" : ""
                    }`}
                  >
                    {/* align-items-center: Dikeyde tüm elemanları hizalar. g-3: Sütunlar arası boşluk (gutter). */}
                    <div className="row align-items-center g-3 text-center text-md-start">
                      {/* Sol Bölüm: Avatar Dairesi */}
                      {/* col-12: Mobilde tam satır. col-md-auto: Masaüstünde içeriği kadar genişlik kaplar. */}
                      <div className="col-12 col-md-auto d-flex justify-content-center">
                        <div
                          className="rounded-circle bg-light border d-flex align-items-center justify-content-center"
                          style={{ width: "42px", height: "42px" }}
                        >
                          <i className="bi bi-person text-secondary fs-5"></i>
                        </div>
                      </div>

                      {/* Şirket Adı */}
                      {/* col-md-2: Genişliğin 12'de 2'sini alır. */}
                      <div className="col-12 col-md-2">
                        <div className="fw-semibold text-dark text-truncate">{app.company}</div>
                      </div>

                      {/* Pozisyon */}
                      {/* col-md-2: Genişliğin 12'de 2'sini alır. */}
                      <div className="col-12 col-md-2">
                        <div className="text-secondary text-truncate">{app.position}</div>
                      </div>

                      {/* Ekli CV / Belge Linki */}
                      {/* col-md-3: Genişliğin 12'de 3'ünü alır. */}
                      <div className="col-12 col-md-3">
                        <a
                          href={app.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none text-primary d-inline-flex align-items-center gap-2"
                        >
                          <i className="bi bi-file-earmark-pdf text-danger fs-5"></i>
                          <span className="text-truncate" style={{ maxWidth: "150px" }}>
                            {app.company.toLowerCase()}_cv.pdf
                          </span>
                        </a>
                      </div>

                      {/* Tarih */}
                      {/* col-md-2: Genişliğin 12'de 2'sini alır. */}
                      <div className="col-12 col-md-2">
                        <span className="text-muted small">
                          {new Date(app.date).toLocaleDateString("tr-TR")}
                        </span>
                      </div>

                      {/* Durum Badge'i */}
                      {/* col-md-2: Genişliğin 12'de 2'sini alır. text-md-end: Masaüstünde sağa dayar. */}
                      <div className="col-12 col-md-2 text-md-end">
                        <span
                          className={`badge rounded-pill px-3 py-2 fw-medium text-capitalize ${getStatusBadgeClass(
                            app.status
                          )}`}
                          style={{ fontSize: "0.8rem", border: "1px solid" }}
                        >
                          {app.status.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
