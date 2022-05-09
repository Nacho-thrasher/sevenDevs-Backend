const router = require('express').Router();
const { createCategory, createCollection, createCurrencies, createFiles_types, createSales_types,
deleteCategory, deleteCollection, deleteCurrencies, deleteFiles_types, deleteSales_types,
modifyCategorie, modifyCollection, modifyCurrencies, modifyFiles_types, modifySales_types, getCategory,
 getCollection, getCurrencies, getFiles_types, getSales_types, getTransactions_Types, createTransaction_type,
 modifyTransaction_type, deleteTransaction_type } = require('../controllers/misc.controllers')


router.post('/category', createCategory);
router.post('/collection', createCollection);
router.post('/currencies', createCurrencies);
router.post('/files_type', createFiles_types);
router.post('/sales_type', createSales_types);
router.post('/trans_type', createTransaction_type);
router.put('/category/:id', modifyCategorie);
router.put('/collection/:id', modifyCollection);
router.put('/currencies/:id', modifyCurrencies);
router.put('/files_type/:id', modifyFiles_types);
router.put('/sales_type/:id', modifySales_types);
router.put('/trans_type/:id', modifyTransaction_type);
router.delete('/category/:id', deleteCategory);
router.delete('/collection/:id', deleteCollection);
router.delete('/currencies/:id', deleteCurrencies);
router.delete('/files_type/:id', deleteFiles_types);
router.delete('/sales_type/:id', deleteSales_types);
router.delete('/trans_type/:id', deleteTransaction_type);
router.get('/category', getCategory);
router.get('/collection', getCollection);
router.get('/currencies', getCurrencies);
router.get('/files_type', getFiles_types);
router.get('/sales_type', getSales_types);
router.get('/trans_type', getTransactions_Types);


module.exports = router;
