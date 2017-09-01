<div class="form-group {if $response.field_errors.{$properties.name}}has-error{/if}">
    <div class="radio">
        <label for="{$properties.name}">
            {$properties.label}    
        </label>
        {foreach $properties.list as $item}
            <label for="{$item.name}">
                <input 
                    type="radio" 
                    id="{$item.name}" 
                    data-type="{$item.name}" 
                    value="{$item.label}" 
                    name="{$properties.name}" 
                    {if $request.{$properties.name} == $item.label}checked{/if}
                > {$item.label}
            </label>
        {/foreach}
    </div>
  
    {if $properties.child}
        <div class="options">
            {$properties.child}
        </div>
    {/if}
</div>