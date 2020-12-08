import sectionType from './sectionType';
import sectionText from './sectionText';
import sectionMedia from './sectionMedia';
import sectionDm from './sectionDm';
import sectionLinks from './sectionLinks';
import sectionAttachments from './sectionAttachments';
import sectionQuote from './sectionQuote';
  
export default {
    "type": "object",
    "properties": {
        "sectionType": sectionType,
        "title": {
            "type" : "localizedString"
        },
        "titleHidden": {
            "type" : "boolean"
        }
    },
    "dependencies": {
        "sectionType" : {
            "oneOf": [
                sectionText,
                sectionMedia,
                sectionDm,
                sectionLinks,
                sectionAttachments,
                sectionQuote,
            ]
        }
    }
}