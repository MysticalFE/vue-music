export default class Song {
    constructor({id, mid, singer, name, album, songDuratin, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.songDuratin = songDuratin
        this.image = image
        this.url = url
    }
}

//将歌曲信息中返回的歌手信息由数组转换为字符串
function filterSinger(singer) {
    let singerArr = []
    if (!singer) {
        return ''
    }
    singer.forEach(item => {
        singerArr.push(item.name)
    })
    return singerArr.join('/')
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        songDuratin: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://124.14.5.147/streamoc.music.tc.qq.com/${musicData.songid}.m4a`
    })
}
