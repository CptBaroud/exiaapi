const fs = require('fs')
const express = require('express');
const doc = require('docx')
const router = express.Router();

const { Document, Footer, HeadingLevel, HorizontalPositionAlign, Packer, Paragraph, TabStopPosition, TabStopType, TextRun } = doc;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/upload', function (req, res) {
    console.dir(req.body)
    createDocx(req.body)
    res.json('Hello')
})

module.exports = router;

/**
 * Permet de génerer le document docx
 * a l'aide des methodes adjointes
 **/
function createDocx(object) {
    // Create document
    const doc = new Document()

    let keywords = object.keyword
    let context = object.context
    console.dir(keywords)
    console.dir(context)

    doc.addSection({
        // Footer de la page
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    text: 'Test session' //'Animateur : ' + temp[0].user + ' / Secretaire : ' + temp[1].user + ' / Scribe : ' + temp[2].user + ' / Gestionaire : ' + temp[3].user
                })]
            })
        },
        // Contenu de la page
        children: [
            new Paragraph({
                text: name,
                heading: HeadingLevel.TITLE,
                alignment: HorizontalPositionAlign.CENTER
            }),
            createSpace(),
            createSpace(),
            createHeading('Mots Clés'),
            createSpace(),
            ...keywords
                .map((education) => {
                    const arr = []
                    arr.push(
                        createListItem(education.name)
                    )
                    return arr
                })
                .reduce((prev, curr) => prev.concat(curr), []),
            createSpace(),
            createSpace(),
            createHeading('Contexte'),
            createSpace(),
            createText(context),
            /* createSpace(),
             createHeading('Contraintes'),
             createSpace(),
             ...constraints
                 .map((item) => {
                     const arr = []
                     arr.push(
                         createListItem(item.name)
                     )
                     return arr
                 })
                 .reduce((prev, curr) => prev.concat(curr), []),
             createSpace(),
             createSpace(),
             createHeading('Généralisation'),
             createSpace(),
             createText(generalisation),
             createSpace(),
             createSpace(),
             createHeading('Problématique'),
             createSpace(),
             createText(problematic),
             createSpace(),
             createSpace(),
             createHeading('Hypothèses'),
             createSpace(),
             ...hypothesises
                 .map((item) => {
                     const arr = []
                     arr.push(
                         createListItem(item.name)
                     )
                     return arr
                 })
                 .reduce((prev, curr) => prev.concat(curr), []),
             createSpace(),
             createSpace(),
             createHeading('Plan d\'action'),
             createSpace(),
             ...paArray
                 .map((item) => {
                     const arr = []
                     arr.push(
                         createListItem(item.name)
                     )
                     return arr
                 })
                 .reduce((prev, curr) => prev.concat(curr), [])*/
        ]
    })

    Packer.toBuffer(doc).then((buffer) => {
        try {
            fs.writeFileSync('./storage/Test.docx', buffer)
        } catch (e) {
            console.log(e)
        }
    });

}

/*
 * Sert a faire un retour a la ligne
 */
function createSpace() {
    return new Paragraph({
        children: [
            new TextRun({
                text: '',
                size: 20
            })
        ]
    })
}

/*
 * Sert a générer un titre
 */
function createHeading(text) {
    return new Paragraph({
        children: [
            new TextRun({
                text,
                size: 28,
                allCaps: true
            })
        ]
    })
}

/*
 * Sert a générer un texte
 */
function createText(text) {
    return new Paragraph({
        children: [
            new TextRun({
                text,
                size: 22
            })
        ]
    })
}

/*
 * Sert à générer un element de la liste
 */
function createListItem(text) {
    return new Paragraph({
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX
            }
        ],
        children: [
            new TextRun({
                text,
                bold: false,
                size: 22
            })
        ]
    })
}
