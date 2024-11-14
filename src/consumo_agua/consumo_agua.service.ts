import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
    private consumos: ConsumoAgua[] = [];
    private currentId = 1;

    registrarConsumo(usuarioId: number, consumo: number): ConsumoAgua {
        const novoConsumo = {
            id: this.currentId++,
            usuarioId,
            consumo,
            dataLeitura: new Date()
        };
        this.consumos.push(novoConsumo);
        return novoConsumo;
    }

    consultarHistorico(usuarioId: number, dataInicial: Date, dataFinal: Date): ConsumoAgua[] {
        return this.consumos.filter(consumo => 
            consumo.usuarioId === usuarioId &&
            consumo.dataLeitura >= dataInicial &&
            consumo.dataLeitura <= dataFinal
        );
    }

    verificarConsumoElevado(usuarioId: number): boolean {
        const consumosUsuario = this.consumos
            .filter(c => c.usuarioId === usuarioId)
            .sort((a, b) => b.dataLeitura.getTime() - a.dataLeitura.getTime());

        if (consumosUsuario.length < 2) return false;

        const consumoAtual = consumosUsuario[0].consumo;
        const consumoAnterior = consumosUsuario[1].consumo;

        return consumoAtual > consumoAnterior;
    }
}
