import { Component, VueComponent } from '@/index'
import { CountService } from '../../count.service'
import { Optional, SkipSelf } from 'injection-js'
import { Button, Col, Row } from 'ant-design-vue'
import { watch } from 'vue'

@Component({
  providers: [CountService],
})
export default class HomeView extends VueComponent {
  constructor(
    @SkipSelf() private parentCountService: CountService,
    private countService: CountService,
    @Optional() private aaa: string,
  ) {
    super()
    watch(
      () => this.parentCountService.count,
      () => (countService.count = parentCountService.count),
      {
        immediate: true,
      },
    )
  }
  render() {
    return (
      <>
        <h3 style={{ textAlign: 'center' }}>全局的状态: {this.parentCountService.count}</h3>
        <h3 style={{ textAlign: 'center' }}>局部的状态</h3>
        <Row justify={'center'}>
          <Col>
            <Button type={'primary'} onClick={this.countService.add}>
              加
            </Button>
            <span style={{ fontSize: '24px', margin: '0 20px' }}>{this.countService.count}</span>
            <Button type={'primary'} danger onClick={this.countService.remove}>
              减
            </Button>
          </Col>
        </Row>
      </>
    )
  }
}
