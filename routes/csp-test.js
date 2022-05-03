let express = require('express');
let router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/csp',
    (req, res) => {
        console.log(`/csp called.`)
        const cspScriptSrc =
            "script-src-attr 'unsafe-hashes' 'sha256-Jhvs7RdTid8e4XmWHITVrVl1z2kekJ8UP2C22dB7VxI=';" + // OK
            // "script-src-attr 'unsafe-inline' 'sha256-Jhvs7RdTid8e4XmWHITVrVl1z2kekJ8UP2C22dB7VxI=';" + //NG
            // "script-src-attr 'unsafe-inline';" + //OK
            "script-src-elem 'strict-dynamic' 'nonce-1234';";
        res.setHeader("Content-Security-Policy", cspScriptSrc)
        res.render('csp', {
            serverNonce: "1234",
            title: 'csp-test-page',
            date: new Date()
        });
    });
router.get('/csp-navigate-to',
    (req, res) => {
        console.log(`/csp-navigate-to called.`)
        const cspScriptSrc =
            "navigate-to 'self';"
        res.setHeader("Content-Security-Policy", cspScriptSrc)
        res.render('csp-navigate-to', {
            title: 'csp-test-page',
            date: new Date()
        });
    });
router.get('/csp-script-src-strict-dynamic',
    (req, res) => {
        console.log(`/csp-script-src-strict-dynamic called.`)
        const nonce = uuidv4();
        const cspScriptSrc = `script-src 'strict-dynamic' 'nonce-${nonce}';`;
        res.setHeader("Content-Security-Policy", cspScriptSrc)
        res.render('csp-script-src-strict-dynamic', {
            serverNonce: nonce,
            title: 'csp-test-page',
            date: new Date()
        });
    });

router.get('/csp-script-src-elem',
    (req, res) => {
        console.log(`/script-src-attr called.`)
        const nonce = uuidv4();
        const cspScriptSrc = `script-src-elem 'strict-dynamic' 'nonce-${nonce}';`;
        res.setHeader("Content-Security-Policy", cspScriptSrc)
        res.render('script-src-elem', {
            serverNonce: nonce,
            title: 'csp-test-page',
            date: new Date()
        });
    });

router.get('/csp-script-src-attr',
    (req, res) => {
        console.log(`/csp-script-src-attr called.`)
        const cspScriptSrc =
            "script-src-attr 'unsafe-hashes' 'sha256-Jhvs7RdTid8e4XmWHITVrVl1z2kekJ8UP2C22dB7VxI=';"; // OK
        // "script-src-attr 'unsafe-inline' 'sha256-Jhvs7RdTid8e4XmWHITVrVl1z2kekJ8UP2C22dB7VxI=';" + //NG
        // "script-src-attr 'unsafe-inline';" + //OK
        res.setHeader("Content-Security-Policy", cspScriptSrc)
        res.render('csp-script-src-attr', {
            title: 'csp-test-page',
            date: new Date()
        });
    });

module.exports = router;
