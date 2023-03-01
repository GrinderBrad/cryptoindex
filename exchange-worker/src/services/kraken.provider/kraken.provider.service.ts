import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import requestPromise from "request-promise";
import { exchangeTickerInterface } from "src/interfaces/ticker.interface";

@Injectable()
export class KrakenProviderService {
	private inFlight = false;
	constructor() {
		this.getTickers();
	}

    providerName() {
        return 'KRAKEN'
    }
    async getPairs() {
        const requestOptions = {
            uri: "https://api.kraken.com/0/public/AssetPairs",
            method: "GET",
            json: true,
        };

        let response;

        try {
            response = await requestPromise(requestOptions);
            return response.result;
        } catch (error) {
            Logger.error(
                error.message,
                "",
                `${KrakenProviderService.name}::getPairs()`
            );
            throw new ForbiddenException("Service unavailable");
        }
    }
	async getTickers() {
        if (this.inFlight) {
            return null;
        }
        let assetPairsResponse = await this.getPairs();

		const requestOptions = {
			uri: "https://api.kraken.com/0/public/Ticker",
			method: "GET",
			json: true,
		};

		let response;
        let tickers: exchangeTickerInterface = {}

		try {
			this.inFlight = true;
			response = await requestPromise(requestOptions);
			this.inFlight = false;
            const result = Object.keys(response.result).map((pairName) => {
                const foundPair = Object.keys(assetPairsResponse).find((assetPair) => assetPairsResponse[assetPair].altname === pairName)
                if (!foundPair) {
                    return;
                }
                tickers[pairName] = {
                    base: assetPairsResponse[foundPair].base,
                    quote: assetPairsResponse[foundPair].quote,
                    price: response.result[pairName].a[0]
                }
            })
			console.log(tickers);
			return tickers;
		} catch (error) {
            console.log(error)
			this.inFlight = false;
			Logger.error(
				error.message,
				"",
				`${KrakenProviderService.name}::getTickers()`
			);
			throw new ForbiddenException("Service unavailable");
		}
	}
}
