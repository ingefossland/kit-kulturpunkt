export default {
  "category" : {
  	"oneOf": [
  	  {
    	  "properties": {
  			  "category": {
  				  "enum": ["movie"]
  			  },
  			  "director": {
            "type": "string"
  			  },
  			  "producer": {
            "type": "string"
  			  },
          "locationShown": {
            "type": "string"
          },
          "locationShot": {
            "type": "string"
          }
    		}
    	},
  	  {
    	  "properties": {
  			  "category": {
  				  "enum": ["music"]
  			  },
  			  "director": {
            "type": "string"
  			  },
  			  "producer": {
            "type": "string"
  			  },
          "album": {
            "type": "string"
          },
          "artist": {
            "type": "string"
          },
          "composer": {
            "type": "string"
          },
          "copywriter": {
            "type": "string"
          },
          "releaseYear": {
            "type": "string"
          },
          "recordCompany": {
            "type": "string"
          },
          "catalogNumber": {
            "type": "string"
          }
    		}
    	},
  	  {
    	  "properties": {
  			  "category": {
  				  "enum": ["tv"]
  			  },
  			  "director": {
            "type": "string"
  			  },
  			  "producer": {
            "type": "string"
  			  },
          "series": {
            "type": "string"
          },
          "season": {
            "type": "string"
          },
          "episode": {
            "type": "string"
          },
          "locationShown": {
            "type": "string"
          },
          "locationShot": {
            "type": "string"
          }
    		}
    	}
    ]
  }
}