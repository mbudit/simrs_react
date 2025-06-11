const db = require('../config/db');

exports.createObat = (req, res) => {
    const obatData = req.body;

    // Ambil code terakhir
    const getLastCodeSQL = "SELECT code FROM obat ORDER BY code DESC LIMIT 1";

    db.query(getLastCodeSQL, (err, rows) => {
        if (err) {
            console.error("DB error:", err);
            return res
                .status(500)
                .json({ error: "Database error saat ambil code terakhir" });
        }

        let nextCode = "0000001"; // default kalau belum ada data

        if (rows.length > 0 && rows[0].code) {
            const lastCode = parseInt(rows[0].code, 10);
            nextCode = String(lastCode + 1).padStart(7, "0");
        }

        const sql = `INSERT INTO obat (
                        code, nama_obat, produksi, isi_kemasan, satuan, pabrik,
                        on_label, off_label, nama_dagang, nama_original,
                        harga_beli, harga_pajak, harga_jual, max_stock, min_stock,
                        eticket, kategori, jenis_obat, komposisi, level_sakit,
                        resiko, obat_terapi, obat_subterapi, sebelum_makan,
                        ketika_makan, setelah_makan, efek_hati, keterangan, sumber_barang
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const values = [
            nextCode,
            obatData.nama_obat,
            obatData.produksi,
            obatData.isi_kemasan,
            obatData.satuan,
            obatData.pabrik,
            obatData.on_label,
            obatData.off_label,
            obatData.nama_dagang,
            obatData.nama_original,
            obatData.harga_beli,
            obatData.harga_pajak,
            obatData.harga_jual,
            obatData.max_stock,
            obatData.min_stock,
            obatData.eticket,
            obatData.kategori,
            obatData.jenis_obat,
            obatData.komposisi,
            obatData.level_sakit,
            obatData.resiko,
            obatData.obat_terapi,
            obatData.obat_subterapi,
            obatData.sebelum_makan,
            obatData.ketika_makan,
            obatData.setelah_makan,
            obatData.efek_hati,
            obatData.keterangan,
            obatData.sumber_barang,
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("DB error:", err);
                return res.status(500).json({ error: "Database error saat insert" });
            }

            res.status(201).json({
                message: "Obat berhasil didaftarkan",
                id: result.insertId,
                code: nextCode,
            });
        });
    });
};

exports.getObat = (req, res) => {
    const sql = `
        SELECT
            id, code, nama_obat, produksi, isi_kemasan, satuan, pabrik,
            on_label, off_label, nama_dagang, nama_original,
            harga_beli, harga_pajak, harga_jual, max_stock, min_stock,
            eticket, kategori, jenis_obat, komposisi, level_sakit,
            resiko, obat_terapi, obat_subterapi, sebelum_makan,
            ketika_makan, setelah_makan, efek_hati, keterangan, sumber_barang
        FROM obat`;

    db.query(sql, (err, results) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
        }
        // results sudah tgl_daftar berupa string 'YYYY-MM-DD'
        res.json(results);
    });
};

exports.updateObat = (req, res) => {
    const { id } = req.params;
    let {
        nama_obat,
        produksi,
        isi_kemasan,
        satuan,
        pabrik,
        on_label,
        off_label,
        nama_dagang,
        nama_original,
        harga_beli,
        harga_pajak,
        harga_jual,
        max_stock,
        min_stock,
        eticket,
        kategori,
        jenis_obat,
        komposisi,
        level_sakit,
        resiko,
        obat_terapi,
        obat_subterapi,
        sebelum_makan,
        ketika_makan,
        setelah_makan,
        efek_hati,
        keterangan,
        sumber_barang,
    } = req.body;

    // Helper function
    const checkAndFill = (value, isDate = false) => {
        if (isDate) return value ? value : null;
        return value ? value : "Tidak Ada";
    };

    // Process all fields
    nama_obat = checkAndFill(nama_obat);
    produksi = checkAndFill(produksi);
    isi_kemasan = checkAndFill(isi_kemasan);
    satuan = checkAndFill(satuan);
    pabrik = checkAndFill(pabrik);
    on_label = checkAndFill(on_label);
    off_label = checkAndFill(off_label);
    nama_dagang = checkAndFill(nama_dagang);
    nama_original = checkAndFill(nama_original);
    harga_beli = checkAndFill(harga_beli);
    harga_pajak = checkAndFill(harga_pajak);
    harga_jual = checkAndFill(harga_jual);
    max_stock = checkAndFill(max_stock);
    min_stock = checkAndFill(min_stock);
    eticket = checkAndFill(eticket);
    kategori = checkAndFill(kategori);
    jenis_obat = checkAndFill(jenis_obat);
    komposisi = checkAndFill(komposisi);
    level_sakit = checkAndFill(level_sakit);
    resiko = checkAndFill(resiko);
    obat_terapi = checkAndFill(obat_terapi);
    obat_subterapi = checkAndFill(obat_subterapi);
    sebelum_makan = checkAndFill(sebelum_makan);
    ketika_makan = checkAndFill(ketika_makan);
    setelah_makan = checkAndFill(setelah_makan);
    efek_hati = checkAndFill(efek_hati);
    keterangan = checkAndFill(keterangan);
    sumber_barang = checkAndFill(sumber_barang);

    const sql = `UPDATE obat SET 
            nama_obat = ?, 
            produksi = ?, 
            isi_kemasan = ?, 
            satuan = ?, 
            pabrik = ?, 
            on_label = ?, 
            off_label = ?, 
            nama_dagang = ?, 
            nama_original = ?, 
            harga_beli = ?, 
            harga_pajak = ?, 
            harga_jual = ?, 
            max_stock = ?, 
            min_stock = ?, 
            eticket = ?, 
            kategori = ?, 
            jenis_obat = ?, 
            komposisi = ?, 
            level_sakit = ?, 
            resiko = ?, 
            obat_terapi = ?, 
            obat_subterapi = ?, 
            sebelum_makan = ?, 
            ketika_makan = ?, 
            setelah_makan = ?, 
            efek_hati = ?, 
            keterangan = ?, 
            sumber_barang = ?
            WHERE id = ?`;

    db.query(
        sql,
        [
            nama_obat,
            produksi,
            isi_kemasan,
            satuan,
            pabrik,
            on_label,
            off_label,
            nama_dagang,
            nama_original,
            harga_beli,
            harga_pajak,
            harga_jual,
            max_stock,
            min_stock,
            eticket,
            kategori,
            jenis_obat,
            komposisi,
            level_sakit,
            resiko,
            obat_terapi,
            obat_subterapi,
            sebelum_makan,
            ketika_makan,
            setelah_makan,
            efek_hati,
            keterangan,
            sumber_barang,
            id,
        ],
        (err, result) => {
        if (err) {
            console.error("Error updating obat:", err);
            return res.status(500).send("Failed to update");
        }
        res.send("Obat updated successfully");
        }
    );
};

exports.deleteObat = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM obat WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ error: "Failed to delete obat" });
        }

        if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Obat not found" });
        }

        res.json({ message: "Obat deleted successfully" });
    });
};
