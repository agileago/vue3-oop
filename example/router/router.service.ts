import { Injectable } from 'injection-js'
import { useRouter } from 'vue-router'

@Injectable()
export class RouterService {
  router = useRouter()
}
