import request from '@/utils/request'

/**
 * 下载用户excel
 * @returns {*}
 */
export function userDownload(){
    return request({
        url: '/sys/user/download',
        method: 'get',
        responseType: 'blob'
    })
}


export function download(res) {
    const blob = new Blob([res])
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = '1.xls'
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
}

export function upload() {
    return request({
        url: 'http://localhost:8088/file/upload',
        method: 'get',
    })
}
