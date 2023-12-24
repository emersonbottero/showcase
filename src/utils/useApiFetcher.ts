import { createFetch } from "@vueuse/core";

const useApiFetch = createFetch({
    baseUrl: 'api'
  })
  
  String.prototype.toURL = function(payload: {[key: string]: any}){
    const str = this as unknown as string
    const regex = /:.*?(?=\/|$)/g;
    let m;
    let result = str;
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach(x => result = result.replace(x ,payload[x.substring(1)]))
    }
    return result
  }

  export default useApiFetch