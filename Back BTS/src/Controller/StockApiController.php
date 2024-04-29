<?php
// src/Controller/ApiStockController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CategorieRepository;
use App\Repository\CommandeRepository;
use App\Repository\FournisseurRepository;
use App\Repository\ProduitRepository;

class StockApiController extends AbstractController
{
    #[Route('/api/categorie', name: 'get_categories', methods: ['GET'])]
    public function getCategories(CategorieRepository $categorieRepository): Response
    {
        $categories = $categorieRepository->findAll();
        return $this->json($categories);
    }

    #[Route('/api/commande', name: 'get_commandes', methods: ['GET'])]
    public function getCommandes(CommandeRepository $commandeRepository): Response
    {
        $commandes = $commandeRepository->findAll();
        return $this->json($commandes);
    }

    #[Route('/api/fournisseur', name: 'get_fournisseurs', methods: ['GET'])]
    public function getFournisseurs(FournisseurRepository $fournisseurRepository): Response
    {
        $fournisseurs = $fournisseurRepository->findAll();
        return $this->json($fournisseurs);
    }

    #[Route('/api/produit', name: 'get_produits_api', methods: ['GET'])]
    public function getProduits(ProduitRepository $produitRepository): Response
    {
        $produits = $produitRepository->findAll();
        return $this->json($produits);
    }
}
