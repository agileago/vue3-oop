import { Hook, Link, useForwardRef, VueComponent } from 'vue3-oop'
import { Input, type InputProps } from 'ant-design-vue'
import { ref } from 'vue'

function createBigSizeInput(size: 'small' | 'middle' | 'large') {
  class BigInput extends VueComponent<Omit<InputProps, 'size'>> {
    forwardRef = useForwardRef()

    render() {
      return (
        <Input
          {...this.context.attrs}
          ref={this.forwardRef}
          size={size}
        ></Input>
      )
    }
  }
  return BigInput
}

const BigInput = createBigSizeInput('large')

class Abc extends VueComponent {
  a = ref(0)

  render() {
    return <div>{this.a.value}</div>
  }
}

export default class HelloWorldView extends VueComponent {
  @Link() abc: Abc[]

  @Link() input: any

  @Hook('Mounted')
  mounted() {
    console.log(this.abc)
    console.log(this.input)
  }
  render() {
    return (
      <div>
        <button onClick={() => this.abc}>+</button>
        <Abc ref_for ref_key={'abc'} ref={'abc'}></Abc>
        <Abc ref_for ref_key={'abc'} ref={'abc'}></Abc>
        <Abc ref_for ref_key={'abc'} ref={'abc'}></Abc>
        <BigInput ref={'input'}></BigInput>
      </div>
    )
  }
}
