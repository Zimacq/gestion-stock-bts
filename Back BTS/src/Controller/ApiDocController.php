<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; // Importation correcte
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiDocController extends AbstractController
{
    /**
     * @Route("/api/doc", name="api_doc")
     */ 
    public function index(): Response
    {
        // Exemple de réponse simple, ajustez selon vos besoins
        $content = "<h1>API Documentation</h1><p>Welcome to the API documentation page.</p>";

        return new Response($content);
    }
}
