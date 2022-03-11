import { type ComponentProps, VueComponent } from 'vue3-oop'

interface CountCompProps {
  size: 'large' | 'small'
}

export class CountComp extends VueComponent<CountCompProps> {
  static defaultProps: ComponentProps<CountCompProps> = ['size']

  render() {
    return <div>{this.props.size}</div>
  }
}
