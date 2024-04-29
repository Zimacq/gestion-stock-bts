<?php

namespace App\Entity;

use App\Repository\ProduitRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProduitRepository::class)]
class Produit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    public ?int $id_produit = null;

    #[ORM\Column(length: 255)]
    public ?string $nom_produit = null;

    #[ORM\Column(type: 'integer')]
    public ?int $reference = null;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    public ?float $prix_vente_unitaire = null;

    #[ORM\Column(type: 'integer')]
    public ?int $quantite_stock = null;

    #[ORM\Column(length: 255)]
    public ?string $taille_disponible = null;

    #[ORM\Column(length: 255)]
    public ?string $couleur_disponible = null;

    #[ORM\ManyToOne(targetEntity: Categorie::class)]
    #[ORM\JoinColumn(name: "id_categorie", referencedColumnName: "id_categorie", nullable: false)]
    public ?Categorie $categorie = null;

    // Getters and Setters

    public function getIdProduit(): ?int
    {
        return $this->id_produit;
    }

    public function getNomProduit(): ?string
    {
        return $this->nom_produit;
    }

    public function setNomProduit(string $nom_produit): self
    {
        $this->nom_produit = $nom_produit;
        return $this;
    }

    public function getReference(): ?int
    {
        return $this->reference;
    }

    public function setReference(int $reference): self
    {
        $this->reference = $reference;
        return $this;
    }

    public function getPrixVenteUnitaire(): ?float
    {
        return $this->prix_vente_unitaire;
    }

    public function setPrixVenteUnitaire(float $prix_vente_unitaire): self
    {
        $this->prix_vente_unitaire = $prix_vente_unitaire;
        return $this;
    }

    public function getQuantiteStock(): ?int
    {
        return $this->quantite_stock;
    }

    public function setQuantiteStock(int $quantite_stock): self
    {
        $this->quantite_stock = $quantite_stock;
        return $this;
    }

    public function getTailleDisponible(): ?string
    {
        return $this->taille_disponible;
    }

    public function setTailleDisponible(string $taille_disponible): self
    {
        $this->taille_disponible = $taille_disponible;
        return $this;
    }

    public function getCouleurDisponible(): ?string
    {
        return $this->couleur_disponible;
    }

    public function setCouleurDisponible(string $couleur_disponible): self
    {
        $this->couleur_disponible = $couleur_disponible;
        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): self
    {
        $this->categorie = $categorie;
        return $this;
    }
}
