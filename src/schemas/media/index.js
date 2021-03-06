import image from './image';
import video from './video';
import audio from './audio';
import misc from './misc';
import vimeo from './vimeo';
import youtube from './youtube';
import sketchfab from './sketchfab';

/*
const schemas = {
    "image": image,
    "video": video,
    "audio": audio
}
*/

const schemas = [
    image,
    video,
    audio,
    vimeo,
    misc,
    youtube,
    sketchfab
]

export default schemas;