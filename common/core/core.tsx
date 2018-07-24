class Core {
    constructor() {
    }

    get(url: string, data?: any, onSuccess?: (data?: any, status?: any, xhr?: any) => any, onError?: (err: any) => any, onAlways?: () => any) {
        return this.send({url: url, type: "GET", data: data, isBlob: false, onSuccess: onSuccess, onError: onError, onAlways: onAlways})
    }

    post(url: string, data?: any, onSuccess?: (data?: any, status?: any, xhr?: any) => any, onError?: (err: any) => any, onAlways?: () => any) {
        return this.send({url: url, type: "POST", data: data, isBlob: false, onSuccess: onSuccess, onError: onError, onAlways: onAlways})
    }

    getAsync<T>(url: string, data?: any) {
        return new Promise<T>((resolve, reject) => {
            this.get(url, data, (data) => {
                resolve(data);
            }, (err) => {
                reject(err);
            })
        });
    }

    postAsync<T>(url: string, data?: any) {
        return new Promise<T>((resolve, reject) => {
            this.post(url, data, (data) => {
                    resolve(data);
                },
                (err) => {
                    reject(err);
                })
        });
    }

    send(params: Partial<ISendParams>) {
        let settings: any = {
            url: params.url,
            type: params.type,
            data: params.data,
            success: (data, status, xhr) => {
                if (params.onSuccess) {
                    params.onSuccess(data, status, xhr);
                }
            },
            error: (err) => {
                if (params.onError) {
                    params.onError(err);
                }
            }
        };
        if (settings.isFile)
            settings.xhr = function () {// Seems like the only way to get access to the xhr object
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                return xhr;
            };
        $.ajax(settings)
            .always(() => {
                if (params.onAlways) {
                    params.onAlways();
                }
            });
    }
}

export interface ISendParams {
    url: string;
    type: 'GET' | 'POST';
    data: any;
    isBlob: boolean;
    onSuccess: (data?: any, status?: any, xhr?: any) => void;
    onError: (err: any) => void;
    onAlways: () => void;
}

export const core = new Core();
