import { Injectable } from '@nestjs/common';
import amqp from 'amqplib';

@Injectable()
export class AmqpProvider {
  private connection: any = null;
  private channel: any = null;

  async init() {
    if (!this.connection) {
      this.connection = await amqp.connect({
        protocol: 'amqp',
        password: process.env.AMQP_PASSWORD,
        port: Number(process.env.AMQP_PORT),
        hostname: process.env.AMQP_HOST,
        username: process.env.AMQP_USER,
      });

      this.channel = await this.connection.createConfirmChannel();
    }
  }

  /**
   * @param {String} topic
   * @param {String} queue
   * @param {Object} requestData
   * @returns Promise<void>
   */
  private async publish(topic: string, queue: string, requestData: object): Promise<void> {
    await new Promise((resolve) => {
      this.channel.publish(topic, queue, Buffer.from(JSON.stringify(requestData)), {}, () => {
        resolve(true);
      });
    });

    await this.channel.waitForConfirms();
  }

  /**
   * @param {Object} requestData
   * @returns Promise<void>
   */
  publishTicker(requestData: object): Promise<void> {
    return this.publish(process.env.AMQP_TICKER_TOPIC, process.env.AMQP_TICKER_QUEUE_NAME, requestData);
  }

}
