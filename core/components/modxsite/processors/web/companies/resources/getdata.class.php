<?php

/*
    Получаем страницы компаний.
    У одной компании может быть только одна страница
*/

# require_once dirname(dirname(dirname(__FILE__))) . '/resources/getdata.class.php';
require_once dirname(dirname(dirname(__FILE__))) . '/society/blogs/getdata.class.php';

# class modWebCompaniesResourcesGetdataProcessor extends modWebResourcesGetdataProcessor{
class modWebCompaniesResourcesGetdataProcessor extends modWebSocietyBlogsGetdataProcessor{
    
    
    public function initialize(){
         
        # parent::initialize();
        // $this->modx->log(1, print_r($this->properties, 1), "FILE");
        // $this->modx->log(1, print_r($_REQUEST, 1), "FILE");
        # return true; 

        $request_body = file_get_contents('php://input');

        if($request_body AND $data = json_decode($request_body, 1)){
            $this->setProperties($data);
        }
        

        foreach($this->properties as $name => & $value){

            if(is_scalar($value)){

                switch((string)$value){

                    case 'true':

                        $value = true;

                        break;

                    case 'false':

                        $value = false;

                        break;

                    case '0':

                        $value = 0;

                        break;

                    case 'null':

                        $value = null;

                        break;

                    case 'undefined':

                        unset($this->properties[$name]);

                        break;
                }
            }

        }

        // var_dump($this->properties);

        $this->setDefaultProperties(array(
            // "sort"  => "avg_rating DESC, {$this->classKey}.menutitle",
            // "dir"   => "ASC",
            "format"    => "json",
            "sort"  => "id",
            "dir"   => "DESC",
            "with_coors_only"   => false,       // Только с координатами
            "approved_only"     => false,       // Только одобренные
            "summary"   => true,
            "cache"             => true,
            'cache_prefix'      => $this->modx->context->key . "/" . get_class($this) . '/getdata/' . $this->modx->user->id. "/",  
        ));
        
        
        
        // Учитываем различные параметры сортировки
        
        // if(
        //     $sort_type = $this->getProperty('sort_type')
        //     AND $sort_value = $this->getProperty('sort_value')
        // )
        
        // switch($this->getProperty('sort_type')){
            
        //     // По рейтингу
        //     case 'rating':
        //         $this->setProperty("sort",  "{$sort_value}_rating DESC, avg_rating DESC, {$this->classKey}.menutitle");
        //         $this->setProperty("dir",  "ASC");
        //         break;
        // }

        $this->modx->log(1, print_r($this->properties, 1), "FILE");
        
        return parent::initialize();
    }
    
    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        $alias = $c->getAlias();
        
        $where = array(
            "template"  => 27,
        );

        $c->leftJoin('modResource', 'City', "City.template = 26 AND City.id = {$alias}.parent");
        
        # $c->innerJoin('modCompany', 'Company');
        
        // По типу заведения
        if($facility_type = (int)$this->getProperty('facility_type')){
            $c->innerJoin("modTemplateVarResource", "facility_type", "facility_type.contentid = {$alias}.id AND facility_type.tmplvarid = 25 AND facility_type.value = {$facility_type}");
        }
        
        // Только с координатами для карты
        if($this->getProperty('with_coors_only')){
            $c->innerJoin("modTemplateVarResource", "coords_tv", 
                "coords_tv.contentid = {$alias}.id AND coords_tv.tmplvarid = 27 AND coords_tv.value != ''"
            );
            // $where['coords_tv.id:!='] = null;
        }
        
        // Только одобренные
        if($this->getProperty('approved_only')){
            $c->innerJoin("modTemplateVarResource", "approved_only", "approved_only.contentid = {$alias}.id AND approved_only.tmplvarid = 24 AND approved_only.value = '1'");
        }

        // По компании
        if($company_id = (int)$this->getProperty("company_id")){
            $where['id'] = $company_id;
        }

        // По компаниям
        if(
            $companies = $this->getProperty("companies")
            OR $companies = (array)$this->getProperty("ids")
        ){
            if(!is_array($companies)){
                $companies = explode(",", $companies);
            }
            $where['id:in'] = $companies;
        }
        

        if($uri = trim($this->getProperty("uri"))){
            $uri = preg_replace("/^\/+/", "", $uri);

            $where['uri'] = $uri;
        }

        /*
            Формируем запрос рейтингов
        */
        
        // $ratings_query = $this->modx->newQuery('modResource', array(
        //     "parent"    => 1349,
        // ));
        
        // $ratings_query->select(array(
        //     "id",
        //     "pagetitle",
        // ));
        

        // $s = $ratings_query->prepare();
        // $s->execute();

        // // print $ratings_query->toSQL();
        
        // $votes_table = $this->modx->getTableName("SocietyVote");
        // $threads_table = $this->modx->getTableName("SocietyThread");
        
        // while($row = $s->fetch(PDO::FETCH_ASSOC)){
        //     $rating_id = $row['id'];
        //     $rating_title = $row['pagetitle'];
        //     # $VotesAlias = "Votes_{$rating_id}";
        //     # $c->leftJoin("SocietyVote", $VotesAlias, "{$VotesAlias}.target_class = 'modResource' AND {$VotesAlias}.target_id = {$alias}.rating_id");
        //     $c->select(array(
        //         "(select round(sum(v.vote_value) / count(distinct v.id), 2) 
        //             from {$votes_table} v
        //             where 
        //                 v.type = {$rating_id} 
        //                 AND v.target_id = {$alias}.id
        //             )as {$rating_id}_rating",
                    
        //         "'{$rating_title}' as {$rating_id}_rating_title",
        //     ));
        // }
        
        // // Получаем общее число голосов
        // $c->select(array(
            
        //     // Средний рейтинг
        //     "round(thread.rating / (thread.positive_votes + thread.negative_votes + thread.neutral_votes), 2) as avg_rating",
            
        //     // Всего голосов
        //     "(select count(distinct v2.user_id) from {$votes_table} v2 where v2.target_class = 'modResource' AND v2.target_id = {$alias}.id) as total_voters",
            
        //     // Всего голосовавших
        //     "(select sum(t.positive_votes + t.negative_votes + t.neutral_votes) from {$threads_table} as t where t.id = thread.id)as total_votes", 
            
        // ));
        
        
        $c->where($where);
        
        // $c->prepare();
        // print $c->toSQL();

        return $c;
    }
    
    public function setSelection(xPDOQuery $c){
        $c = parent::setSelection($c); 
         
        $alias = $c->getAlias();

        $c->select(array(
            "{$alias}.pagetitle as name",
            "City.id as city_id",
            "City.pagetitle as city",
            "City.uri as city_uri",
            // "coords_tv.value as coords",
        ));
        
        return $c;
    }

    // protected function prepareResponse($response){
        
    //     $response = parent::prepareResponse($response);
        
    //     if($this->getProperty("format") == "json"){
    //         $response = json_encode($response);
    //     }

    //     return $response;
    // }

    public function afterIteration(array $list){

        $list = parent::afterIteration($list);

        foreach($list as & $l){
            if(!empty($l['tvs']['ya_coords']['value'])){
                $l['coords'] = array_map('trim', explode(",", $l['tvs']['ya_coords']['value']));
            }
            // else{
            //     $l['coords'] = [35,35];
            // }
        }

        return $list;
    }
    
    # public function setSelection(xPDOQuery $c){
    #     $c = parent::setSelection($c);
    #     
    #     $c->innerJoin('modCountry', "Country", "Country.id = Company.country_id");
    #     $c->innerJoin('modCity', "City", "City.id = Company.city_id");
    #     
    #     $c->select(array(
    #         "Country.country",
    #         "City.city",
    #     ));
    #     
    #     $columns = array();
    #     $fields = $this->modx->getFields('modCompany');
    #     
    #     foreach($fields as $t => $v){
    #         $columns[] = "Company.{$t} as company_{$t}";
    #     }
    #      
    #     $c->select($columns);
    #     
    #     return $c;
    # }
}

return 'modWebCompaniesResourcesGetdataProcessor';
