<?php

namespace App\Entity;

use App\Repository\CategorieRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategorieRepository::class)]
class Categorie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id_categorie = null;

    #[ORM\Column(length: 255)]
    public ?string $nom_categorie = null;

    // Correction de la fonction getId pour retourner la propriété correcte
    public function getIdCategorie(): ?int
    {
        return $this->id_categorie;
    }

    public function getNomCategorie(): ?string
    {
        return $this->nom_categorie;
    }

    // Changement du type de retour à self pour la méthode setter
    public function setNomCategorie(string $nom_categorie): self
    {
        $this->nom_categorie = $nom_categorie;

        return $this;
    }
}
