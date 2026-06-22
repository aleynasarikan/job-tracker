import React, { useState, useEffect } from "react";
import { getApplications, saveApplications } from "../utils/storage";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedApps, setSelectedApps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("");

  useEffect(() => {
    const localData = getApplications();
    // Eğer localStorage'dan gelen veriler eski yapıdaysa (candidateName yoksa),
    // varsayılan yeni verilerle üzerine yazalım.
    if (localData.length === 0 || (localData.length > 0 && !localData[0].candidateName)) {
      const defaultData = [
        {
          id: "1",
          candidateName: "Ahmet Yılmaz",
          position: "Frontend Developer",
          dateOfBirth: "26.02.1995",
          exp: 5,
          skills: "React, Vue",
          date: "26.02.2026",
          status: "Yeni Başvuru",
          avatar: "https://i.pravatar.cc/150?img=11"
        },
        {
          id: "2",
          candidateName: "Ayşe Kaya",
          position: "Senior Designer",
          dateOfBirth: "29.03.1996",
          exp: 2,
          skills: "Figma, UI/UX",
          date: "29.03.2026",
          status: "İnceleniyor",
          avatar: "https://i.pravatar.cc/150?img=5"
        },
        {
          id: "3",
          candidateName: "Mehmet Demir",
          position: "Fullstack Engineer",
          dateOfBirth: "18.06.1990",
          exp: 1,
          skills: "Node.js, React",
          date: "18.06.2026",
          status: "Mülakat",
          avatar: "https://i.pravatar.cc/150?img=12"
        },
        {
          id: "4",
          candidateName: "Elif Şahin",
          position: "Product Manager",
          dateOfBirth: "10.10.1993",
          exp: 2,
          skills: "Agile, Scrum",
          date: "10.10.2026",
          status: "Teklif İletildi",
          avatar: "https://i.pravatar.cc/150?img=9"
        },
        {
          id: "5",
          candidateName: "Burak Yılmaz",
          position: "Backend Developer",
          dateOfBirth: "17.12.1992",
          exp: 3,
          skills: "Java, Spring",
          date: "17.12.2026",
          status: "Reddedildi",
          avatar: "https://i.pravatar.cc/150?img=15"
        }
      ];
      saveApplications(defaultData);
      setApplications(defaultData);
    } else {
      setApplications(localData);
    }
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedApps = applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApps);
    saveApplications(updatedApps);
  };

  const handleDelete = (id) => {
    const updatedApps = applications.filter(app => app.id !== id);
    setApplications(updatedApps);
    saveApplications(updatedApps);
  };

  const toggleSelect = (id) => {
    if (selectedApps.includes(id)) {
      setSelectedApps(selectedApps.filter(appId => appId !== id));
    } else {
      setSelectedApps([...selectedApps, id]);
    }
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    alert(`Yeni ilan eklendi: ${newJobTitle} (${newJobDept})`);
    setShowModal(false);
    setNewJobTitle("");
    setNewJobDept("");
  };

  const filteredApps = applications.filter(app =>
    (app.candidateName || "").toLowerCase().includes(search.toLowerCase()) ||
    (app.position || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          NKR<span className="red">SOFT</span>
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-item"><i className="bi bi-building"></i> Şirket</li>
          <li className="sidebar-item active"><i className="bi bi-people-fill"></i> Adaylar</li>
          <li className="sidebar-item"><i className="bi bi-cash-stack"></i> Giderler</li>
          <li className="sidebar-item"><i className="bi bi-box"></i> Varlıklar</li>
          <li className="sidebar-item"><i className="bi bi-bar-chart-line"></i> Raporlar</li>
          <li className="sidebar-item"><i className="bi bi-search"></i> İşe Alım</li>
          <li className="sidebar-item"><i className="bi bi-person-badge"></i> İK</li>
          <li className="sidebar-item"><i className="bi bi-currency-dollar"></i> Satış</li>
          <li className="sidebar-item"><i className="bi bi-folder"></i> Projeler</li>
          <li className="sidebar-item"><i className="bi bi-gear"></i> Admin</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-icons">
            <i className="bi bi-envelope"></i>
            <i className="bi bi-bell"></i>
          </div>
          <div className="user-profile">
            <img src="https://i.pravatar.cc/150?img=32" alt="User" />
            <span>Diane Webb</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="content-body">
          {/* Actions Bar */}
          <div className="actions-bar">
            <div className="actions-left">
              <button className="btn-custom"><i className="bi bi-upload"></i> İçe Aktar</button>
              <button className="btn-custom"><i className="bi bi-download"></i> Dışa Aktar</button>
              <button className="btn-custom btn-delete-bulk"><i className="bi bi-trash"></i> Sil</button>
            </div>

            <div className="actions-right">
              <button className="btn-custom"><i className="bi bi-sort-down"></i> Sırala</button>
              <div className="search-container">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Burada ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="btn-primary-custom btn-custom" onClick={() => setShowModal(true)}>
                <i className="bi bi-plus-lg"></i> Yeni İlan Ekle
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input type="checkbox" className="custom-checkbox" />
                </th>
                <th>Ad Soyad</th>
                <th>Pozisyon</th>
                <th>Doğum Tarihi</th>
                <th>Dny (Yıl)</th>
                <th>Yetenekler</th>
                <th>Durum</th>
                <th style={{ textAlign: 'center' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map(app => (
                <tr key={app.id} className={selectedApps.includes(app.id) ? "selected" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedApps.includes(app.id)}
                      onChange={() => toggleSelect(app.id)}
                    />
                  </td>
                  <td>
                    <div className="td-user">
                      <img src={app.avatar} alt={app.candidateName} />
                      {app.candidateName}
                    </div>
                  </td>
                  <td>{app.position}</td>
                  <td>{app.dateOfBirth}</td>
                  <td style={{ textAlign: 'center' }}>{app.exp}</td>
                  <td>{app.skills}</td>
                  <td>
                    <select
                      className="status-dropdown"
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    >
                      <option value="Yeni Başvuru">Yeni Başvuru</option>
                      <option value="İnceleniyor">İnceleniyor</option>
                      <option value="Mülakat">Mülakat</option>
                      <option value="Teklif İletildi">Teklif İletildi</option>
                      <option value="Reddedildi">Reddedildi</option>
                    </select>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <i className="bi bi-pencil-square action-icon" title="Düzenle"></i>
                    <i
                      className="bi bi-trash action-icon delete"
                      title="Sil"
                      onClick={() => handleDelete(app.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* New Job Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4 className="mb-4 fw-bold">Yeni İlan Ekle</h4>
            <form onSubmit={handleAddJob}>
              <div className="mb-3">
                <label className="form-label text-muted small fw-semibold">İlan Başlığı</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Örn: Senior Frontend Developer"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label text-muted small fw-semibold">Departman</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Örn: Engineering"
                  value={newJobDept}
                  onChange={(e) => setNewJobDept(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>İptal</button>
                <button type="submit" className="btn btn-primary-custom">İlanı Oluştur</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
