<?php
$xpdo_meta_map['modCity']= array (
  'package' => 'modxsite',
  'version' => '1.1',
  'table' => 'modxsite_cities',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'city' => NULL,
    'country_id' => NULL,
    'rank' => 0,
    'link' => NULL,
    'domain' => NULL,
    'big' => '0',
  ),
  'fieldMeta' => 
  array (
    'city' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'index' => 'index',
    ),
    'country_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
    ),
    'rank' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'index',
    ),
    'link' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => true,
    ),
    'domain' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '25',
      'phptype' => 'string',
      'null' => true,
      'index' => 'unique',
    ),
    'big' => 
    array (
      'dbtype' => 'enum',
      'precision' => '\'0\',\'1\'',
      'phptype' => 'string',
      'null' => false,
      'default' => '0',
    ),
  ),
  'indexes' => 
  array (
    'Index' => 
    array (
      'alias' => 'Index',
      'primary' => false,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'city' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'country_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'domain' => 
    array (
      'alias' => 'domain',
      'primary' => false,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'domain' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => true,
        ),
      ),
    ),
    'rank' => 
    array (
      'alias' => 'rank',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'rank' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  "aggregates"  => array(
        "Country"  => array(
            "class" => "modCountry",
            "cardinality"   => "one",
            "local" => "country_id",
            "foreign"   => "id",
            "owner"     => "foreign",
        ), 
    ),
);
