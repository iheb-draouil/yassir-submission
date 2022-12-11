"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.createTable('city', tb => {
            tb.bigIncrements('id').primary();
            tb.string('name', 50)
                .unique()
                .notNullable();
            tb.double('lon').notNullable();
            tb.double('lat').notNullable();
        })
            .createTable('aq_info', tb => {
            tb.bigIncrements('id').primary();
            tb.bigInteger('city')
                .unsigned()
                .notNullable();
            tb.foreign('city')
                .references('id')
                .inTable('city');
            tb.double('aq').notNullable();
            tb.bigInteger('ts').notNullable();
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema
            .dropTable('aq_info')
            .dropTable('city');
    });
}
exports.down = down;
//# sourceMappingURL=20221006043708_city_aq.js.map