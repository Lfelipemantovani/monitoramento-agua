import { Controller, Post, Body, ParseIntPipe } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo-agua')
export class ConsumoAguaController {
    constructor(private readonly consumoAguaService: ConsumoAguaService) {}

    @Post('registrar')
    registrarConsumo(
        @Body('usuarioId', ParseIntPipe) usuarioId: number,
        @Body('consumo') consumo: number,
    ): ConsumoAgua {
        return this.consumoAguaService.registrarConsumo(usuarioId, consumo);
    }
}
