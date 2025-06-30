const db = require("../config/db");

////// Controller for Tarif Pelayanan Rawat Jalan //////
exports.createLayananRajal = (req, res) => {
    const formData = req.body;

    let prefix = "";
    if (formData.jenis_layanan === "Mata") {
        prefix = "TIRJ-01";
    } else if (formData.jenis_layanan === "Mulut") {
        prefix = "TIRJ-02";
    } else if (formData.jenis_layanan === "Psikoterapi") {
        prefix = "TIRJ-03";
    } else {
        return res.status(400).json({
            error: "Jenis layanan tidak valid untuk pembuatan kode_tindakan",
        });
    }

    // Hitung jumlah kode tindakan yang sudah ada untuk jenis layanan ini
    const countQuery = `
        SELECT COUNT(*) AS total FROM tarif_pelayanan_rajal 
        WHERE kode_tindakan LIKE '${prefix}%' 
        `;

    db.query(countQuery, (err, result) => {
        if (err) {
        console.error("DB error saat menghitung:", err);
        return res
            .status(500)
            .json({ error: "Database error saat menghitung kode tindakan" });
        }

        const count = result[0].total + 1; // Nomor urutan berikutnya
        const kode_tindakan = `${prefix}${count}`;

        const insertQuery = `
            INSERT INTO tarif_pelayanan_rajal (
            kode_tindakan,
            jenis_layanan,
            nama_tindakan,
            kelas_perawatan,
            kategori,
            tarif,
            jasa_rs,
            jasa_pelayanan
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            kode_tindakan,
            formData.jenis_layanan,
            formData.nama_tindakan,
            formData.kelas_perawatan,
            formData.kategori,
            formData.tarif,
            formData.jasa_rs,
            formData.jasa_pelayanan,
        ];

        db.query(insertQuery, values, (err2, result2) => {
            if (err2) {
                console.error("DB error saat insert:", err2);
                return res
                .status(500)
                .json({ error: "Database error saat menyimpan layanan" });
            }
            res.status(201).json({
                message: "Data layanan berhasil disimpan",
                id: result2.insertId,
                kode_tindakan: kode_tindakan,
            });
        });
    });
};

exports.getLayananRajal = (req, res) => {
    const sql = `
        SELECT
            id, jenis_layanan, kode_tindakan, nama_tindakan, kelas_perawatan, kategori,
            tarif, jasa_rs, jasa_pelayanan
        FROM tarif_pelayanan_rajal`;

    db.query(sql, (err, results) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
        }
        // results sudah tgl_daftar berupa string 'YYYY-MM-DD'
        res.json(results);
    });
};

exports.deleteLayananRajal = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM tarif_pelayanan_rajal WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ error: "Failed to delete pelayanan rawat jalan" });
        }

        if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Pelayanan rawat jalan not found" });
        }

        res.json({ message: "Pelayanan rawat jalan deleted successfully" });
    });
};

exports.updateLayananRajal = (req, res) => {
    const { id } = req.params;
    let {
        jenis_layanan,
        nama_tindakan,
        kelas_perawatan,
        kategori,
        tarif,
        jasa_rs,
        jasa_pelayanan,
    } = req.body;

    // Helper function
    const checkAndFill = (value, isDate = false) => {
        if (isDate) return value ? value : null;
        return value ? value : "Tidak Ada";
    };

    // Process all fields
    jenis_layanan = checkAndFill(jenis_layanan);
    nama_tindakan = checkAndFill(nama_tindakan);
    kelas_perawatan = checkAndFill(kelas_perawatan);
    kategori = checkAndFill(kategori);
    tarif = checkAndFill(tarif);
    jasa_rs = checkAndFill(jasa_rs);
    jasa_pelayanan = checkAndFill(jasa_pelayanan);

    const sql = `UPDATE tarif_pelayanan_rajal SET 
            jenis_layanan = ?, 
            nama_tindakan = ?, 
            kelas_perawatan = ?, 
            kategori = ?, 
            tarif = ?, 
            jasa_rs = ?, 
            jasa_pelayanan = ? 
            WHERE id = ?`;

    db.query(
        sql,
        [
            jenis_layanan,
            nama_tindakan,
            kelas_perawatan,
            kategori,
            tarif,
            jasa_rs,
            jasa_pelayanan,
            id,
        ],
        (err, result) => {
        if (err) {
            console.error("Error updating pelayanan rawat jalan:", err);
            return res.status(500).send("Failed to update");
        }
        res.send("Pelayanan rawat jalan updated successfully");
        }
    );
};

////// Controller for Tarif Pelayanan Rawat Inap //////
exports.createLayananRanap = (req, res) => {
    const formData = req.body;

    let prefix = "";
    if (formData.jenis_layanan === "Mata") {
        prefix = "TIRI-01";
    } else if (formData.jenis_layanan === "Mulut") {
        prefix = "TIRI-02";
    } else if (formData.jenis_layanan === "Psikoterapi") {
        prefix = "TIRI-03";
    } else {
        return res.status(400).json({
            error: "Jenis layanan tidak valid untuk pembuatan kode_tindakan",
        });
    }

    // Hitung jumlah kode tindakan yang sudah ada untuk jenis layanan ini
    const countQuery = `
        SELECT COUNT(*) AS total FROM tarif_pelayanan_ranap 
        WHERE kode_tindakan LIKE '${prefix}%' 
        `;

    db.query(countQuery, (err, result) => {
        if (err) {
        console.error("DB error saat menghitung:", err);
        return res
            .status(500)
            .json({ error: "Database error saat menghitung kode tindakan" });
        }

        const count = result[0].total + 1; // Nomor urutan berikutnya
        const kode_tindakan = `${prefix}${count}`;

        const insertQuery = `
            INSERT INTO tarif_pelayanan_ranap (
            kode_tindakan,
            jenis_layanan,
            nama_tindakan,
            kelas_perawatan,
            kategori,
            tarif,
            jasa_rs,
            jasa_pelayanan
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            kode_tindakan,
            formData.jenis_layanan,
            formData.nama_tindakan,
            formData.kelas_perawatan,
            formData.kategori,
            formData.tarif,
            formData.jasa_rs,
            formData.jasa_pelayanan,
        ];

        db.query(insertQuery, values, (err2, result2) => {
            if (err2) {
                console.error("DB error saat insert:", err2);
                return res
                .status(500)
                .json({ error: "Database error saat menyimpan layanan" });
            }
            res.status(201).json({
                message: "Data layanan berhasil disimpan",
                id: result2.insertId,
                kode_tindakan: kode_tindakan,
            });
        });
    });
};

exports.getLayananRanap = (req, res) => {
    const sql = `
        SELECT
            id, jenis_layanan, kode_tindakan, nama_tindakan, kelas_perawatan, kategori,
            tarif, jasa_rs, jasa_pelayanan
        FROM tarif_pelayanan_ranap`;

    db.query(sql, (err, results) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
        }
        // results sudah tgl_daftar berupa string 'YYYY-MM-DD'
        res.json(results);
    });
};

exports.deleteLayananRanap = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM tarif_pelayanan_ranap WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ error: "Failed to delete pelayanan rawat inap" });
        }

        if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Pelayanan rawat inap not found" });
        }

        res.json({ message: "Pelayanan rawat inap deleted successfully" });
    });
};

exports.updateLayananRanap = (req, res) => {
    const { id } = req.params;
    let {
        jenis_layanan,
        nama_tindakan,
        kelas_perawatan,
        kategori,
        tarif,
        jasa_rs,
        jasa_pelayanan,
    } = req.body;

    // Helper function
    const checkAndFill = (value, isDate = false) => {
        if (isDate) return value ? value : null;
        return value ? value : "Tidak Ada";
    };

    // Process all fields
    jenis_layanan = checkAndFill(jenis_layanan);
    nama_tindakan = checkAndFill(nama_tindakan);
    kelas_perawatan = checkAndFill(kelas_perawatan);
    kategori = checkAndFill(kategori);
    tarif = checkAndFill(tarif);
    jasa_rs = checkAndFill(jasa_rs);
    jasa_pelayanan = checkAndFill(jasa_pelayanan);

    const sql = `UPDATE tarif_pelayanan_ranap SET 
            jenis_layanan = ?, 
            nama_tindakan = ?, 
            kelas_perawatan = ?, 
            kategori = ?, 
            tarif = ?, 
            jasa_rs = ?, 
            jasa_pelayanan = ? 
            WHERE id = ?`;

    db.query(
        sql,
        [
            jenis_layanan,
            nama_tindakan,
            kelas_perawatan,
            kategori,
            tarif,
            jasa_rs,
            jasa_pelayanan,
            id,
        ],
        (err, result) => {
        if (err) {
            console.error("Error updating pelayanan rawat inap:", err);
            return res.status(500).send("Failed to update");
        }
        res.send("Pelayanan rawat inap updated successfully");
        }
    );
};

////// Controller for Tarif Pelayanan IGD //////
exports.createLayananIGD = (req, res) => {
    const formData = req.body;

    let prefix = "";
    if (formData.jenis_layanan === "Mata") {
        prefix = "TIGD-01";
    } else if (formData.jenis_layanan === "Mulut") {
        prefix = "TIGD-02";
    } else if (formData.jenis_layanan === "Psikoterapi") {
        prefix = "TIGD-03";
    } else {
        return res.status(400).json({
            error: "Jenis layanan tidak valid untuk pembuatan kode_tindakan",
        });
    }

    // Hitung jumlah kode tindakan yang sudah ada untuk jenis layanan ini
    const countQuery = `
        SELECT COUNT(*) AS total FROM tarif_pelayanan_igd 
        WHERE kode_tindakan LIKE '${prefix}%' 
        `;

    db.query(countQuery, (err, result) => {
        if (err) {
        console.error("DB error saat menghitung:", err);
        return res
            .status(500)
            .json({ error: "Database error saat menghitung kode tindakan" });
        }

        const count = result[0].total + 1; // Nomor urutan berikutnya
        const kode_tindakan = `${prefix}${count}`;

        const insertQuery = `
            INSERT INTO tarif_pelayanan_igd (
            kode_tindakan,
            jenis_layanan,
            nama_tindakan,
            kelas_perawatan,
            kategori,
            tarif,
            jasa_rs,
            jasa_pelayanan
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            kode_tindakan,
            formData.jenis_layanan,
            formData.nama_tindakan,
            formData.kelas_perawatan,
            formData.kategori,
            formData.tarif,
            formData.jasa_rs,
            formData.jasa_pelayanan,
        ];

        db.query(insertQuery, values, (err2, result2) => {
            if (err2) {
                console.error("DB error saat insert:", err2);
                return res
                .status(500)
                .json({ error: "Database error saat menyimpan layanan" });
            }
            res.status(201).json({
                message: "Data layanan berhasil disimpan",
                id: result2.insertId,
                kode_tindakan: kode_tindakan,
            });
        });
    });
};

exports.getLayananIGD = (req, res) => {
    const sql = `
        SELECT
            id, jenis_layanan, kode_tindakan, nama_tindakan, kelas_perawatan, kategori,
            tarif, jasa_rs, jasa_pelayanan
        FROM tarif_pelayanan_igd`;

    db.query(sql, (err, results) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
        }
        // results sudah tgl_daftar berupa string 'YYYY-MM-DD'
        res.json(results);
    });
};

exports.deleteLayananIGD = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM tarif_pelayanan_igd WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ error: "Failed to delete pelayanan IGD" });
        }

        if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Pelayanan IGD not found" });
        }

        res.json({ message: "Pelayanan IGD deleted successfully" });
    });
};

exports.updateLayananIGD = (req, res) => {
    const { id } = req.params;
    let {
        jenis_layanan,
        nama_tindakan,
        kelas_perawatan,
        kategori,
        tarif,
        jasa_rs,
        jasa_pelayanan,
    } = req.body;

    // Helper function
    const checkAndFill = (value, isDate = false) => {
        if (isDate) return value ? value : null;
        return value ? value : "Tidak Ada";
    };

    // Process all fields
    jenis_layanan = checkAndFill(jenis_layanan);
    nama_tindakan = checkAndFill(nama_tindakan);
    kelas_perawatan = checkAndFill(kelas_perawatan);
    kategori = checkAndFill(kategori);
    tarif = checkAndFill(tarif);
    jasa_rs = checkAndFill(jasa_rs);
    jasa_pelayanan = checkAndFill(jasa_pelayanan);

    const sql = `UPDATE tarif_pelayanan_igd SET 
            jenis_layanan = ?, 
            nama_tindakan = ?, 
            kelas_perawatan = ?, 
            kategori = ?, 
            tarif = ?, 
            jasa_rs = ?, 
            jasa_pelayanan = ? 
            WHERE id = ?`;

    db.query(
        sql,
        [
            jenis_layanan,
            nama_tindakan,
            kelas_perawatan,
            kategori,
            tarif,
            jasa_rs,
            jasa_pelayanan,
            id,
        ],
        (err, result) => {
        if (err) {
            console.error("Error updating pelayanan IGD:", err);
            return res.status(500).send("Failed to update");
        }
        res.send("Pelayanan IGD updated successfully");
        }
    );
};