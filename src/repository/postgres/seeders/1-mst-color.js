const { MODEL_PROPERTIES: { TABLES } } = require('../../../utils')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  const colors = [{ name: 'HITAM' },
    { name: 'HITAM METALIK' },
    { name: 'PUTIH' },
    { name: 'PUTIH METALIK' },
    { name: 'ABU ABU' },
    { name: 'ABU ABU METALIK' },
    { name: 'MERAH' },
    { name: 'MERAH METALIK' },
    { name: 'PUTIH SOLID' },
    { name: 'PUTIH MUTIARA' },
    { name: 'SILVER' },
    { name: 'SILVER METALIK' },
    { name: 'UNGU' },
    { name: 'BIRU' },
    { name: 'PERAK METALIK' },
    { name: 'PUTIH ORCHID' },
    { name: 'PUTIH ORCHID MUTIARA' },
    { name: 'ABU ABU MUDA' },
    { name: 'ABU ABU MUDA METALIK' },
    { name: 'MERAH TUA' },
    { name: 'BIRU METALIK' },
    { name: 'KUNING' },
    { name: 'KUNING METALIK' },
    { name: 'ORANGE' },
    { name: 'ORANGE METALIK' },
    { name: 'HIJAU' },
    { name: 'HIJAU METALIK' },
    { name: 'UNGU METALIK' },
    { name: 'HITAM MIKA' },
    { name: 'HITAM SILVER' },
    { name: 'BIRU TUA' },
    { name: 'BIRU TUA METALIK' },
    { name: 'PUTIH SILVER' },
    { name: 'KUNING SILVER' },
    { name: 'HITAM MUTIARA' },
    { name: 'SILVER KOMBINASI' },
    { name: 'KUNING PUTIH' },
    { name: 'MERAH MUDA' },
    { name: 'ABU ABU TUA METALIK' },
    { name: 'MERAH HITAM' },
    { name: 'KUNING KOMBINASI' },
    { name: 'HITAM KOMBINASI' },
    { name: 'COKELAT' },
    { name: 'COKELAT MUDA' },
    { name: 'COKELAT TUA' },
    { name: 'BIRU MUDA METALIK' },
    { name: 'ABU ABU BAJA METALIK' },
    { name: 'PUTIH KOMBINASI' },
    { name: 'COKELAT TUA METALIK' },
    { name: 'HIJAU MUDA METALIK' },
    { name: 'ABU ABU BULAN METALIK' },
    { name: 'ABU PERAK METALIK' },
    { name: 'KUNING PEKAT' },
    { name: 'HIJAU TOSCA' },
    { name: 'BIRU KOMBINASI' },
    { name: 'HITAM KANZAI' },
    { name: 'HIJAU KOMBINASI' },
    { name: 'HIJAU TUA' },
    { name: 'SILVER BIRU' },
    { name: 'COKELAT METALIK' },
    { name: 'MERAH PUTIH' },
    { name: 'HITAM RANGKA' },
    { name: 'ABU ABU MAGMA METALIK' },
    { name: 'HITAM PUTIH' },
    { name: 'CREAM KOMBINASI' },
    { name: 'MERAH SOLID' },
    { name: 'MERAH PEKAT MUTIARA' },
    { name: 'MERAH TUA METALIK' },
    { name: 'MERAH MUDA KOMBINASI' },
    { name: 'UNGU KOMBINASI' },
    { name: 'ORANGE MUDA' },
    { name: 'KUNING MUDA METALIK' },
    { name: 'SILVER HITAM' },
    { name: 'BIRU SILVER' },
    { name: 'PUTIH HITAM' },
    { name: 'HIJAU TOSCA KOMBINASI' },
    { name: 'ABU ABU  TUA METALIK' },
    { name: 'ABU ABU  TUA MIKA' },
    { name: 'ABU ABU TUA MIKA' },
    { name: 'COKLAT METALIK' },
    { name: 'COKLAT MUDA METALIK' },
    { name: 'COKLAT TUA METALIK' },
    { name: 'SILVER PUTIH' },
    { name: 'HIJAU PUTIH' },
    { name: 'KUNING MUTIARA' },
    { name: 'BIRU TUA MUTIARA' },
    { name: 'ABU ABU METAL METALIK' },
    { name: 'ORANGE PHOENIX MUTIARA' },
    { name: 'UNGU LAUT MUTIARA' }]
  return knex(TABLES.COLOR).del()
    .then(() =>
      // Inserts seed entries
      knex(TABLES.COLOR).insert(colors));
};
