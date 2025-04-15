import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria' })
export class CategoriaEntity {
  @PrimaryGeneratedColumn()
  categoriaId: number;

  @Column()
  nameCategoria: string;
}
