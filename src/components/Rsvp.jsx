import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';

// URL API SheetDB
const API_URL = "https://sheetdb.io/api/v1/iuwvhfvfmahwk";

const Rsvp = () => {
  const { title, description, bankAccounts } = weddingConfig.rsvp;

  // ================= STATE =================
  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: 'Hadir',
    jumlahtamu: '1',
    ucapan: ''
  });

  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const sortedData = data.reverse().map((item, index) => ({
          id: index,
          name: item.nama || "Tamu Undangan",
          status: item.kehadiran,
          message: item.ucapan
        }));

        setWishes(sortedData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchWishes();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ⚠️ FORMAT WAJIB SheetDB
      const payload = {
        data: [
          {
            nama: formData.nama,
            kehadiran: formData.kehadiran,
            "jumlahtamu": formData.jumlahtamu, // ✅ sesuai spreadsheet
            ucapan: formData.ucapan,
            timestamp: new Date().toISOString()
          }
        ]
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Gagal kirim");

      // tampilkan langsung di UI
      const newWish = {
        id: Date.now(),
        name: formData.nama || "Tamu Undangan",
        status: formData.kehadiran,
        message: formData.ucapan
      };

      setWishes([newWish, ...wishes]);

      // reset form
      setFormData({
        nama: '',
        kehadiran: 'Hadir',
        jumlahtamu: '1',
        ucapan: ''
      });

      alert("✅ Data berhasil dikirim!");
    } catch (error) {
      console.error(error);
      alert("❌ Gagal mengirim data");
    } finally {
      setIsLoading(false);
    }
  };

  // ================= COPY REKENING =================
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Nomor rekening ${text} berhasil disalin!`);
  };

  // ================= UI =================
  return (
    <section id="rsvp" className="py-5" style={{ backgroundColor: '#fff' }}>
      <div className="container py-5">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h2 className="display-5 fw-bold">{title}</h2>
          <p className="text-muted">{description}</p>
        </motion.div>

        <div className="row g-5">

          {/* FORM */}
          <div className="col-lg-6">
            <div className="card p-4 shadow rounded-4">
              <h4 className="mb-4 text-center">Konfirmasi Kehadiran</h4>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="nama"
                  className="form-control mb-3"
                  placeholder="Nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />

                <select
                  name="jumlahtamu"
                  className="form-select mb-3"
                  value={formData.jumlahtamu}
                  onChange={handleChange}
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                </select>

                <div className="mb-3">
                  <label>
                    <input
                      type="radio"
                      name="kehadiran"
                      value="Hadir"
                      checked={formData.kehadiran === 'Hadir'}
                      onChange={handleChange}
                    /> Hadir
                  </label>

                  <label className="ms-3">
                    <input
                      type="radio"
                      name="kehadiran"
                      value="Berhalangan"
                      checked={formData.kehadiran === 'Berhalangan'}
                      onChange={handleChange}
                    /> Berhalangan
                  </label>
                </div>

                <textarea
                  name="ucapan"
                  className="form-control mb-3"
                  placeholder="Ucapan..."
                  value={formData.ucapan}
                  onChange={handleChange}
                  required
                />

                <button className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? "Mengirim..." : "Kirim"}
                </button>
              </form>
            </div>

            {/* GIFT */}
            <div className="card p-4 mt-4">
              <h5 className="text-center">Wedding Gift</h5>

              {bankAccounts.map((acc, i) => (
                <div key={i} className="d-flex justify-content-between mt-3">
                  <div>
                    <b>{acc.bankName}</b><br />
                    <small>{acc.accountNumber}</small>
                  </div>

                  <button onClick={() => copyToClipboard(acc.accountNumber)}>
                    Salin
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* LIST UCAPAN */}
          <div className="col-lg-6">
            <div className="card p-4 shadow rounded-4" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <h4 className="text-center mb-3">Buku Tamu</h4>

              {isFetching ? (
                <p className="text-center">Loading...</p>
              ) : wishes.length === 0 ? (
                <p className="text-center">Belum ada ucapan</p>
              ) : (
                wishes.map(wish => (
                  <div key={wish.id} className="mb-3 p-3 bg-light rounded">
                    <b>{wish.name}</b>
                    <span className={`ms-2 badge ${wish.status === 'Hadir' ? 'bg-success' : 'bg-danger'}`}>
                      {wish.status}
                    </span>
                    <p className="mb-0">{wish.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Rsvp;