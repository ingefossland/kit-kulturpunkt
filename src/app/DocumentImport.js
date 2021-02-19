import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import DocumentPreview from "./DocumentPreview"

import Editor from "./Editor"
import model from "../components/PrimusEditor/Artwork.model"

import { getImport } from "./utils/import"

const importData = {"motif": {"depictedObjects": [], "titles": [], "classifications": [], "subjects": [{"nameType": "subject", "name": "Portrett"}], "depictedPersons": [{"role": {"code": "70", "name": "Avbildet person "}, "uuid": "6262197B-59CB-44BB-83C0-76D8FEB12206", "name": "Nixon, Richard", "type": "Person", "id": 30159, "publishLevel": "normal"}]}, "exhibitions": [], "links": [], "commentCount": 0, "titles": [{"status": "anvendt", "language": "ENG", "title": "Nixon Visions"}, {}], "references": [], "names": [{"nameType": "name", "name": "Collage", "uuid": "2978194A-A1D7-43FD-876F-69BB30870B88"}], "licenses": [{"persons": [{"role": {"code": "49", "name": "Opphavsrettsinnehaver"}, "uuid": "EBCB19FF-75F3-49E8-A446-23D234DCB7CC", "name": "Slettemark, Kjartan", "type": "Person", "id": 24764, "publishLevel": "extended"}, {"role": {"code": "E1", "name": "Rettighetsforvalter"}, "uuid": "B0C3921B-7C2A-4843-BADA-5D5ACC623B49", "name": "BONO", "type": "Institusjon", "id": 26746, "publishLevel": "extended"}], "code": "1", "system": "AC", "description": "Opphavsrett"}], "ownerIdentifiers": [], "uuid": "F64D7559-650D-4B1E-B6C8-947D399E23FA", "media": {"pictures": [{"index": 34614, "code": "0", "width": 2510, "licenses": [], "identifier": "022wY1GxaWxq", "height": 3000}, {"index": 34615, "code": "0", "width": 2515, "licenses": [], "identifier": "022wY1GxaWxx", "height": 3000}, {"index": 34616, "code": "0", "width": 2524, "licenses": [], "identifier": "022wY1GxaX7d", "height": 3000}, {"index": 34617, "code": "0", "width": 2496, "licenses": [], "identifier": "022wY1GxaX7j", "height": 3000}, {"index": 34618, "code": "0", "width": 2486, "licenses": [], "identifier": "022wY1GxaXGT", "height": 3000}, {"index": 34619, "code": "0", "width": 2500, "licenses": [], "identifier": "032wY1GxaXLs", "height": 3000}, {"index": 34620, "code": "0", "width": 2528, "licenses": [], "identifier": "032wY1GxaXRJ", "height": 3000}, {"index": 34621, "code": "0", "width": 2495, "licenses": [], "identifier": "022wY1GxaXVi", "height": 3000}], "mediaFiles": [], "movies": []}, "technique": {"techniques": [{"sort": 1, "technique": "Collage"}, {"sort": 2, "technique": "Penn"}]}, "partOfCollection": {"owner": {"identifier": "NMK", "id": 1, "name": "Nasjonalmuseet for kunst, arkitektur og design"}, "ownerId": "NMK", "uuid": "320A4378-939F-4A28-AFEC-7A56877AC752", "id": 8, "name": "NMK billedkunst [samtid]"}, "copies": [], "coordinates": [], "subjects": [{"nameType": "subject", "name": "Bildende kunst", "uuid": "BE0D8624-1B19-45ED-A0EF-71E05220406A"}], "uniqueId": "021046108741", "eventWrap": {"placesOfProduction": [], "producers": [{"info": {"references": [{"url": "//viaf.org/viaf/17210227", "type": "VIAF", "description": "Permalink", "reference": "ID: 17210227"}], "places": [], "nationality": "Norge", "gender": "Mann", "professions": [], "alternativeNames": [{"description": "kunstnernavn", "name": "kjARTan", "id": 24764}]}, "role": {"code": "10K", "name": "Kunstner"}, "uuid": "EBCB19FF-75F3-49E8-A446-23D234DCB7CC", "name": "Slettemark, Kjartan", "type": "Person", "id": 24764, "publishLevel": "extended"}], "descriptiveDating": "1971", "production": {"sort": 6, "timespan": {"toDate": "19710101-133000-000", "fromYear": 1971, "fromDate": "19710101-133000-000", "toYear": 1971}, "eventType": "Produksjon", "relatedPersons": [{"info": {"references": [{"url": "//viaf.org/viaf/17210227", "type": "VIAF", "description": "Permalink", "reference": "ID: 17210227"}], "places": [], "nationality": "Norge", "gender": "Mann", "professions": [], "alternativeNames": [{"description": "kunstnernavn", "name": "kjARTan", "id": 24764}]}, "role": {"code": "10K", "name": "Kunstner"}, "uuid": "EBCB19FF-75F3-49E8-A446-23D234DCB7CC", "name": "Slettemark, Kjartan", "type": "Person", "id": 24764, "publishLevel": "extended"}], "relatedPlaces": [], "eventTypeClarification": "Produsert"}, "events": [{"sort": 6, "timespan": {"toDate": "19710101-133000-000", "fromYear": 1971, "fromDate": "19710101-133000-000", "toYear": 1971}, "eventType": "Produksjon", "relatedPersons": [{"info": {"references": [{"url": "//viaf.org/viaf/17210227", "type": "VIAF", "description": "Permalink", "reference": "ID: 17210227"}], "places": [], "nationality": "Norge", "gender": "Mann", "professions": [], "alternativeNames": [{"description": "kunstnernavn", "name": "kjARTan", "id": 24764}]}, "role": {"code": "10K", "name": "Kunstner"}, "uuid": "EBCB19FF-75F3-49E8-A446-23D234DCB7CC", "name": "Slettemark, Kjartan", "type": "Person", "id": 24764, "publishLevel": "extended"}], "relatedPlaces": [], "eventTypeClarification": "Produsert"}], "acquisition": "Kj\u00f8pt 1993"}, "measures": [{"sort": 1, "category": "Rammem\u00e5l", "measure": 490.0, "spesification": "Hver av 8 collager (med ramme)", "type": "Bredde", "unit": "mm"}, {"sort": 2, "category": "Rammem\u00e5l", "measure": 578.0, "spesification": "Hver av 8 collager (med ramme)", "type": "H\u00f8yde", "unit": "mm"}], "tags": [], "rateCount": 0, "material": {"comment": "Collage p\u00e5 papir", "materials": [{"sort": 1, "material": "Papir"}]}, "measureDescription": "578 x 490 mm", "alternativeIdentifiers": [], "partOfExhibitionUuids": ["1E68DA39-6201-436C-9E40-2B34029C2AD5"], "trademarks": [], "dimuCode": "021046108741", "inscriptions": [], "classifications": [{"code": "532", "system": "OU", "description": "Bildende kunst"}], "partOfFolderUuids": [], "level": {"code": "8", "name": "Komplekst objekt"}, "sourceId": "198463", "publishedDate": "20151219-050328-557960", "styleWrap": {}, "publishLevel": "limited", "childArtifacts": [{"count": 1, "sort": 5, "uuid": "C1155CBE-8DDF-4BE7-80A0-AA8FF14C8D61", "sourceId": "350016", "published": true, "dimuCode": "011042380418", "artifactType": "Fineart", "identifier": "MS-03553-1993-005", "description": "Collage"}, {"count": 1, "sort": 2, "uuid": "D0A295D7-DD0B-4690-A69F-D11953B35C65", "sourceId": "350013", "published": true, "dimuCode": "011042298431", "artifactType": "Fineart", "identifier": "MS-03553-1993-002", "description": "Collage"}, {"count": 1, "sort": 3, "uuid": "4A96D5B6-19FE-47BE-AAFC-1F451DD94576", "sourceId": "350014", "published": true, "dimuCode": "01104720183", "artifactType": "Fineart", "identifier": "MS-03553-1993-003", "description": "Collage"}, {"count": 1, "sort": 4, "uuid": "E1D1DA95-8515-400F-AC15-1785487F2E57", "sourceId": "350015", "published": true, "dimuCode": "01104720184", "artifactType": "Fineart", "identifier": "MS-03553-1993-004", "description": "Collage"}, {"count": 1, "sort": 6, "uuid": "839084B8-A1E6-419C-85C1-44A77D444D12", "sourceId": "350017", "published": true, "dimuCode": "01104720185", "artifactType": "Fineart", "identifier": "MS-03553-1993-006", "description": "Collage"}, {"count": 1, "sort": 7, "uuid": "B1255A37-52A1-4C83-84B4-905201286580", "sourceId": "350018", "published": true, "dimuCode": "01104720186", "artifactType": "Fineart", "identifier": "MS-03553-1993-007", "description": "Collage"}, {"count": 1, "sort": 8, "uuid": "80528565-36BF-4A38-B66C-E2CC583341C7", "sourceId": "350019", "published": true, "dimuCode": "01104720187", "artifactType": "Fineart", "identifier": "MS-03553-1993-008", "description": "Collage"}, {"count": 1, "sort": 1, "uuid": "E44BDCF7-10FA-4DAA-B478-9ABBB3F9540C", "sourceId": "350011", "published": true, "dimuCode": "021046108757", "artifactType": "Fineart", "identifier": "MS-03553-1993-001", "description": "Collage"}], "artifactType": "Fineart", "identifier": {"owner": "NMK-B", "id": "MS-03553-1993"}, "unique_id": "021046108741", "dimu_code": "021046108741", "artifact_id": 6108741, "publishStatus": "published", "createdDate": "20151219-050328-580764", "updatedDate": "20190205-050720-44978", "indexLevel": null}

const DocumentImport = () => {

    const dispatch = useDispatch()

    const location = useLocation()
    const pathname = location.pathname

    const app = useSelector(state => state.app)



    const formData = {
        modelName: "documents",
        collectionId: app.collectionId,
        import: JSON.stringify(importData),
        content: getImport(importData)
    }

    // set schema

    const schema = {
        ...model.schema,
        properties: {
            ...model.schema.properties,
            import: {
                type: "string"
            }
        }
    }

    const uiSchema = {
        ...model.uiSchema,
        "ui:collapsible": true,
        "ui:fieldset": ["import","content"],
        "import": {
            "ui:widget": "textarea",
            "ui:title": "Import content"
        }
    }

    // set formContext

    const [previewExpanded, setPreviewExpanded] = useState(false)

    const _onExpandPreview = () => {
        setPreviewExpanded(true)
    }

    const _onCollapsePreview = () => {
        setPreviewExpanded(false)
    }

    const _onTogglePreview = () => {
        setPreviewExpanded(expanded => !expanded)
    }

    const preview = {
        template: DocumentPreview,
        expanded: previewExpanded,
        onExpand: _onExpandPreview,
        onCollapse: _onCollapsePreview
    }

    const formContext = {
        preview: preview,
        onTogglePreview: _onTogglePreview,
        onExpandPreview: _onExpandPreview,
        onCollapsePreview: _onCollapsePreview,
    }
    
    return (
        <Editor schema={schema} uiSchema={uiSchema} formData={formData} formContext={formContext} />
    )


}

DocumentImport.defaultProps = {
}

export default DocumentImport