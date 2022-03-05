import { Autobind, Mut, VueComponent } from 'vue3-oop'

export default class UserInputView extends VueComponent {
  @Mut() message = 'Hello World!'

  @Autobind()
  reverseMessage() {
    this.message = this.message.split('').reverse().join('')
  }

  @Autobind()
  notify(e: MouseEvent) {
    e.preventDefault()
    alert('navigation was prevented.')
  }
  render() {
    return (
      <>
        <h1>{this.message}</h1>
        <button onClick={this.reverseMessage}>Reverse Message</button>
        <button onClick={() => (this.message += '!')}>Append "!"</button>
        <a href="https://vuejs.org" onClick={this.notify}>
          A link with e.preventDefault()
        </a>
        <style>
          {`
            button, a {
              display: block;
              margin-bottom: 1em;
            }
            `}
        </style>
      </>
    )
  }
}
